import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from '../services/heroes.service';
import { Heroe } from '../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {

  public heroes: Heroe[] = [];
  public loading: boolean = true;

  constructor(private router: Router,  private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  back(){
    this.router.navigate(['/heroes']);
  }

  goto(){
    this.router.navigate(['/heroe', 'nuevo']);
  }

  getHeroes(){
    this.loading = true;
    return this.heroesService.getHeroes().subscribe({
      next: (resp) => {
        // console.log(resp);
        this.heroes = resp;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }


  redirect(id: string | undefined){
    this.router.navigate(['/heroe', id]);
  }


  // borrar heroe con idx del ngfor
  // deleteHeroe(heroe: Heroe, i: number){
  //   this.heroes.splice(i, 1); 
  //   this.heroesService.deleteHeroe(heroe.id).subscribe({
  //     next: (resp) => {
  //       console.log(resp);
  //       Swal.fire({
  //         title: 'Eliminado',
  //         text: `El heroe ${heroe.nombre} ha sido eliminado`,
  //         icon: 'success',
  //         confirmButtonText: 'Ok'
  //       });
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('complete');
  //     }
  //   });
  // }

  // borrar heroe 
  deleteHeroe(heroe: Heroe){

    Swal.fire({
      title: "Esta Seguro?",
      text: `Esta seguro que desea borrar a ${heroe.nombre}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      allowOutsideClick: false
    }).then((result) =>{
      if (result.isConfirmed) {
        this.heroesService.deleteHeroe(heroe.id).subscribe({
          next: (resp) => {
            // Swal.fire({
            //   title: 'Espere por favor...',
            //   allowOutsideClick: false,
            //   showConfirmButton: false,
            //   didOpen: () => {
            //     Swal.showLoading();
            //   },
            //   willClose: () => {
            //     Swal.hideLoading();
            //     Swal.fire({
            //       title: 'Eliminado',
            //       text: `El heroe ${heroe.nombre} ha sido eliminado`,
            //       icon: 'success',
            //       allowOutsideClick: false,
            //       showConfirmButton: true,
            //     })
            //   },
            //   timer: 1500
            // });
            this.getHeroes();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          }
        });
      }
    });
  }
}
