import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
//import swal from 'sweetalert';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
const swal: SweetAlert = _swal as any;

@Injectable()
export class UsuarioService {

	usuario: Usuario;
	token: string;

	constructor( public http: HttpClient, public router: Router	) { 

		this.cargarStorage();
	}


	estaLogueado() {

		return (this.token.length > 5 ) ? true : false;
	}

	guardarStorage( id: string, token: string, usuario: Usuario) {

		localStorage.setItem('id', id );
		localStorage.setItem('token', token );
		localStorage.setItem('usuario', JSON.stringify(usuario) );	// En el localStorage no se pueden guardar objetos, por lo tanto debo guardarlo como string en formato JSON

		this.usuario = usuario;
		this.token = token;

	}

	cargarStorage() {

		if ( localStorage.getItem('token') ) {

			this.token = localStorage.getItem('token');
			this.usuario = JSON.parse( localStorage.getItem('usuario') );
		} else {

			this.token = '';
			this.usuario = null;
		}
	}


	logOut() {

		this.token = '';
		this.usuario = null;
		
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');

		this.router.navigate(['/login']);		
	}

	loginGoogle( token: string ) {

		let url = URL_SERVICIOS + '/login/google';

		// tengo que enviar el token como objeto, por eso lo pongo entre llaves.
		// Por otro lado, estas dos sentencias son equivalentes: { token } = { token: token } (EMAScript)
		return this.http.post( url, { token } )
			.map( (resp: any) => {

				this.guardarStorage( resp.id, resp.token, resp.usuario);

				return true;
			});

	}



	login( usuario: Usuario, recordar: boolean) {

		if (recordar) {
			localStorage.setItem('email', usuario.email);
		} else {
			localStorage.removeItem('email');
		}

		let url = URL_SERVICIOS + '/login';

		return this.http.post( url, usuario )
			.map( (resp: any) => {

				// localStorage.setItem('id', resp.id );
				// localStorage.setItem('token', resp.token );
				// localStorage.setItem('usuario', JSON.stringify(resp.usuario) );	// En el localStorage no se pueden guardar objetos, por lo tanto debo guardarlo como string en formato JSON

				this.guardarStorage( resp.id, resp.token, resp.usuario);

				return true;
			});
	}


	crearUsuario (usuario: Usuario) {

		let url = URL_SERVICIOS + '/usuario';

		return this.http.post( url, usuario )
			.map( (resp: any) => {

				swal('Usuario creado', usuario.email, 'success');

				return resp.usuario;
			})
	}
}
