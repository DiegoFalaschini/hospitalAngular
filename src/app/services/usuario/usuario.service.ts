import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

//import swal from 'sweetalert';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

// RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const swal: SweetAlert = _swal as any;

@Injectable()
export class UsuarioService {

	usuario: Usuario;
	token: string;
	menu: any = [];

	constructor( public http: HttpClient, public router: Router, public _subirArchivo: SubirArchivoService	) { 

		this.cargarStorage();
	}


	estaLogueado() {

		return (this.token.length > 5 ) ? true : false;
	}

	guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {

		localStorage.setItem('id', id );
		localStorage.setItem('token', token );
		localStorage.setItem('usuario', JSON.stringify(usuario) );	// En el localStorage no se pueden guardar objetos, por lo tanto debo guardarlo como string en formato JSON
		localStorage.setItem('menu', JSON.stringify(menu) );
		
		this.usuario = usuario;
		this.token = token;
		this.menu = menu;

	}

	cargarStorage() {

		if ( localStorage.getItem('token') ) {

			this.token = localStorage.getItem('token');
			this.usuario = JSON.parse( localStorage.getItem('usuario') );
			this.menu = JSON.parse( localStorage.getItem('menu') );
		} else {

			this.token = '';
			this.usuario = null;
			this.menu = [];
		}
	}


	logOut() {

		this.token = '';
		this.usuario = null;
		this.menu = null;
		
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		localStorage.removeItem('menu');

		this.router.navigate(['/login']);		
	}

	loginGoogle( token: string ) {

		let url = URL_SERVICIOS + '/login/google';

		// tengo que enviar el token como objeto, por eso lo pongo entre llaves.
		// Por otro lado, estas dos sentencias son equivalentes: { token } = { token: token } (EMAScript)
		return this.http.post( url, { token } )
			.map( (resp: any) => {

				this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );

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

				this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);

				return true;
			})
			.catch( err => {

				console.log( err.error.mensaje );

				swal( 'Error en el login', err.error.mensaje, 'error');
				
				return Observable.throw( err );
			});
	}


	crearUsuario (usuario: Usuario) {

		let url = URL_SERVICIOS + '/usuario';

		return this.http.post( url, usuario )
			.map( (resp: any) => {

				swal('Usuario creado', usuario.email, 'success');

				return resp.usuario;
			})
			.catch( err => {

				swal( 'Error al crear el usuario', err.error.errors.message, 'error');
				
				return Observable.throw( err );
			});
	}


	actualizarUsuario ( usuario: Usuario ) {

		let url = URL_SERVICIOS + '/usuario/' + usuario._id;
		url += '?token=' + this.token;

		console.log(url);

		return this.http.put( url, usuario )
			.map( (resp: any) => {

				console.log(resp);
				
				// solo si el usuario actualizado es el mismo que esta logueado
				if ( usuario._id === this.usuario._id ) {

					let usuarioDB: Usuario = resp.usuario;

					this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
				}


				swal('Usuario actualizado', usuario.nombre, 'success');

				return true;
			})
			.catch( err => {

				swal( 'Error al actualizar el usuario', err.error.errors.message, 'error');
				
				return Observable.throw( err );
			});
		
	}


	cambiarImagen( archivo: File, id: string ) {

		this._subirArchivo.subirArchivo( archivo, 'usuarios', id)
			.then( (resp: any) => {

				this.usuario.img = resp.usuario.img;

				swal( 'Imagen Actualizada', this.usuario.nombre, 'success');

				console.log(this.usuario.img);

				this.guardarStorage( id, this.token, this.usuario, this.menu );

				console.log(resp.usuario.img);
				console.log(this.usuario.img);
				
			})
			.catch( resp => {

				console.log(resp);
				
			});
		
	}
	
	cargarUsuarios ( desde: number = 0) {

		let url = URL_SERVICIOS + '/usuario?desde=' + desde;

		return this.http.get(url);

	}	

	buscarUsuarios ( termino: string ) {

		let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;

		return this.http.get( url )
			.map( (resp: any) => {
				
				console.log(resp);
				
				return resp.usuario;
			});
	}	


	borrarUsuario ( id: string ) {

		let url = URL_SERVICIOS + '/usuario/' + id;
		url += '?token=' + this.token;

		return this.http.delete( url )
			.map( resp => {

				swal('Usuario borrado', "el usuario ha sido eliminado correctamente", 'success');

				return true;
			});
	}
}
