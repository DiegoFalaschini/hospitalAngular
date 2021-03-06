import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

	constructor(
		public _usuarioService: UsuarioService,
		public router: Router
	) {}


  	canActivate(): Promise<boolean> | boolean {


		console.log('Token guard');

		let token = this._usuarioService.token;
		
		let payload = JSON.parse( atob( token.split('.')[1] ) );

		console.log(payload);
		
		let expirado = this.expirado( payload.exp );


		if ( expirado ) {

			this.router.navigate(['/login']);
			return false;
		}
		


		return this.verificaRenueva( payload.exp );
	  }
	  


	verificaRenueva( fechaExp: number ): Promise<boolean> {

		return new Promise( (resolve, reject) => {

			let tokenExp = new Date( fechaExp * 1000 );
			let ahora = new Date();	// ahora podria tener la fecha de la BD asi no puede ser manipulada desde el cliente cambiando la hora de la maquina

			ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000) );	// Sumo 1 horas

			console.log( tokenExp );
			console.log( ahora );
			

			if ( tokenExp.getTime() > ahora.getTime() ) {

				resolve( true );
			} else {
				// Si falta menos de una hora para que expire el token...
				this._usuarioService.renuevaToken()
					.subscribe( () => {

						resolve(true);
					},
					() => {
						reject(false);
					});
			}
			

			
		});

	}

	expirado( fechaExp: number ) {

		let ahora = new Date().getTime() / 1000;

		if ( fechaExp < ahora ) {
			return true;
		} else {
			return false;
		}
	}
}
