import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../models/heroe.model';
import { environment } from '../../../environments/environment';
import { delay, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }
  
  
  createHeroe(heroe: Heroe){
    return this.http.post(`${environment.baseUrl}/heroes.json`, heroe).pipe(
      take(1),
      map((resp: any) => {
        // console.log ({resp});
        // console.log ({heroe});
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  getHeroe(id: string){
    // https://crud-legacy-angular-seccion12-default-rtdb.firebaseio.com/heroes/-NoTOchM3Mv3Bt4OCeHc,json
    return this.http.get(`${environment.baseUrl}/heroes/${id}.json`).pipe(
      take(1),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getHeroes(){
    return this.http.get(`${environment.baseUrl}/heroes.json`).pipe(
      take(1),
      map((resp: any) => {
        return this.returnArray(resp);
      }),
      delay(1500)
    );
  }

  updateHeroe(heroe: Heroe){
    // https://crud-legacy-angular-seccion12-default-rtdb.firebaseio.com/heroes/-NoT7iKMt6YNqei0yBvj.json
    // const { nombre, poder, vivo } = heroe;
    // return this.http.put(`${environment.baseUrl}/heroes/${heroe.id}.json`, { nombre, poder, vivo }).pipe()
    const heroeTemp: Heroe = {
      ...heroe,
    };
    let id = heroeTemp.id;
    delete heroeTemp.id;
    return this.http.put(`${environment.baseUrl}/heroes/${heroe.id}.json`, heroeTemp).pipe(
      take(1),
      map((resp: any) => {
        // console.log ({resp});
        // console.log ({heroe});
        heroe.id = id;
        return heroe;
      })
    )
  }

  deleteHeroe(id: string = ''){
    return this.http.delete(`${environment.baseUrl}/heroes/${id}.json`).pipe(
      take(1),
      map((resp: any) => {
        return resp;
      })
    )
  }

    /**
   * Convierte un objeto de héroes en un array de objetos Heroe.
   * 
   * @param heroesObj - El objeto de héroes a convertir.
   * @returns Un array de objetos Heroe.
   */
    private returnArray(heroesObj: any){
    
      const heroes: Heroe[] = [];
      if (heroesObj === null) { return []; }
      // console.log(heroesObj)
      Object.keys(heroesObj).forEach((key: string) => {
        // console.log (heroesObj[key]);
        // const heroe: Heroe = {
        //   id: key,
        //   ...heroesObj[key]
        // };
        // const heroe: Heroe = heroesObj[key];
        // console.log (heroe);
        // heroe.id = key;

        const heroe: Heroe = {
          id: key,
          nombre: heroesObj[key].nombre,
          poder: heroesObj[key].poder,
          vivo: heroesObj[key].vivo
        };
        heroes.push(heroe);
      });
      return heroes;
    }


  // updateHeroe(heroe: Heroe){
  // https://crud-legacy-angular-seccion12-default-rtdb.firebaseio.com/heroes/-NoT7iKMt6YNqei0yBvj.json
  // const { nombre, poder, vivo } = heroe;
  // return this.http.put(`${environment.baseUrl}/heroes/${heroe.id}.json`, { nombre, poder, vivo }).pipe()
  //   const heroeTemp: Heroe = {
  //     ...heroe,
  //   };
  //   delete heroeTemp.id;
  //   return this.http.put(`${environment.baseUrl}/heroes/${heroe.id}.json`, heroeTemp).pipe(
  //     take(1),
  //     map((resp: any) => {
  //       console.log ({resp});
  //       console.log ({heroe});
  //       return heroe;
  //     })
  //   )
  // }

}
