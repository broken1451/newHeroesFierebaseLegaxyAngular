import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../services/heroes.service';
import { Heroe } from '../models/heroe.model';
import Swal from 'sweetalert2'
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrl: './heroe.component.scss'
})
export class HeroeComponent implements OnInit {

  public heroeForm!: FormGroup;
  public disabled: boolean = true;

  get formsValue() {
    return this.heroeForm.controls;
  }


  constructor(private router: Router, private fb: FormBuilder, private heroeService: HeroesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.heroeForm = this.fb.group({
      id: [{ value: '', disabled: this.disabled }],
      nombre: [{ value: '', disabled: false }, [Validators.required]],
      poder: [{ value: '', disabled: false }],
      vivo: [{ value: true, disabled: false }]
    });

    let idHeroe = '';
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => {
        idHeroe = id;
        if (id == 'nuevo') {
          return new Observable<Heroe>();
        }
        return this.getHeroe(id);
      })
    ).subscribe({
      next: (heroe) => {
        if(!heroe){
          this.router.navigate(['/heroes']);
        }else{
          if (idHeroe != 'nuevo') {
            this.heroeForm.patchValue({
              id: idHeroe,
              nombre: heroe.nombre,
              poder: heroe.poder,
              vivo: heroe.vivo
            });
          }
        }
      },
      error: error => console.error({ error })
    });
  }


  back() {
    this.router.navigate(['/heroes']);
  }

  submit() {
    if (this.heroeForm.invalid) {
      return;
    }
    const heroe: Heroe = {
      nombre: this.formsValue['nombre'].value,
      poder: this.formsValue['poder'].value,
      vivo: this.formsValue['vivo'].value,
      id: this.formsValue['id'].value
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;


    if (heroe.id != '') {
      console.log('Update');
      peticion = this.heroeService.updateHeroe(heroe);
    } else {
      console.log('Create');
      delete heroe.id;
      peticion = this.heroeService.createHeroe(heroe);
    }

    peticion.subscribe({
      next: (resp) => {
        console.log({ resp });
        this.heroeForm.patchValue({
          id: resp.id
        });
        Swal.fire({
          title: this.formsValue['nombre'].value,
          text: 'Se actualizó correctamente',
          icon: 'success'
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
    // this.heroeForm.reset();


    // if (heroe.id != '') {
    //   console.log ('update');
    //   this.heroeService.updateHeroe(heroe).subscribe({
    //     next: (resp) => {
    //       console.log(resp);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     }
    //   });
    //   return;
    // }
    // delete heroe.id;
    // this.heroeService.createHeroe(heroe).subscribe({
    //   next: (resp) => {
    //     console.log(resp);
    //     this.heroeForm.patchValue({
    //       id: resp.id
    //     });
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });

  }

  /**
   * Changes the status of the hero.
   * 
   * @param value - The new status value.
   */
  changeStatus(value: boolean) {
    this.heroeForm.patchValue({
      vivo: value = !value
    });
  }

  getHeroe(id: string): Observable<Heroe> {
    return this.heroeService.getHeroe(id);
  }

  clean(crear: string) {
    if (crear == 'crear') {
      this.heroeForm.reset({
        id: [''],
        nombre: [''],
        poder: [''],
        vivo: [false]
      });
      return;
    }
  }
}
