import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, retry, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


	subscription1: Subscription;

	constructor() {

		


		// CLASE 75: "retry" está disponible a partir de rxjs version 6. sirve para especificar la cantidad de reintentos
		// obs.pipe(
		// 	retry(2)
		// )
		this.subscription1 = this.regresaObservable().subscribe(
			numero => console.log ('Subs', numero),
			error => console.error('error en el Obs', error),
			() => console.log('El observador terminó correctamente')
		);

		this.regresaObservableAny().subscribe (
			numero => console.log ('Subs ANY: ', numero),
			error => console.error('error en el Obs', error),
			() => console.log('El observador terminó correctamente')
		);
	}

  ngOnInit() {
  }

  ngOnDestroy() {
	  this.subscription1.unsubscribe();
  }


  	regresaObservable(): Observable<number> {

		return  new Observable ( observer => {
			let contador = 0;

			let intervalo = setInterval( () => {
				contador += 1;

				observer.next( contador);

				if (contador === 3 ) {

					clearInterval(intervalo);
					observer.complete()
				}

				if (contador === 2) {
					clearInterval(intervalo);
					observer.error("Error en observer: auxilio!!");
				}

			}, 1000);
		});

	  }
	  
  	regresaObservableAny(): Observable<any> {
		  
		return  new Observable ( observer => {
			let contador = 0;

			let intervalo = setInterval( () => {
				contador += 1;

				const salida = {
					valor: contador
				}

				observer.next( salida);

				if (contador === 3 ) {

					clearInterval(intervalo);
					observer.complete()
				}

				// if (contador === 2) {
				// 	clearInterval(intervalo);
				// 	observer.error("Error en observer: auxilio!!");
				// }

			}, 1000);
		}).pipe(
			map( (resp: any) => {
				return resp.valor;

			}),
			filter ( (valor, index ) => {

				if ( (valor % 2))

					return  true;
				else

					return false;
			})
		);

		// Tambien se puede haber escrito asi:
		// map( (resp: any) =>  resp.valor)
  	}	  

}
