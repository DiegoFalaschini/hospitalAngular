import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

	constructor() { 

		// let promesa = new Promise( (resolve, reject) => {

		// 	let contador = 0;

		// 	let intervalo = setInterval( () => {

		// 		contador += 1;

		// 		if (contador === 3) {
		// 			resolve();

		// 			// resolve('termino correctamente'); // Se pueden agregar mensajes
		// 			// reject('Erorr 3')
		// 			clearInterval(intervalo);
		// 		}

		// 	}, 1000);
		// });

		this.contarTres().then (
			() => console.log('termino!')
		)
		.catch( error => console.error ('Error en la promesa', error));
		
	}

	ngOnInit() {
	}

	contarTres (): Promise <boolean> {

		return new Promise( (resolve, reject) => {

			let contador = 0;

			let intervalo = setInterval( () => {

				contador += 1;

				if (contador === 3) {
					resolve(true);

					// resolve('termino correctamente'); // Se pueden agregar mensajes
					// reject('Erorr 3')
					clearInterval(intervalo);
				}

			}, 1000);
		});
	}

}
