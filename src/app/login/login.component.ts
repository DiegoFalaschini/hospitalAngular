import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { log } from 'util';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins (); // CLASE 64
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	email: string;
	recuerdame: boolean = false;

	auth2: any;

	constructor(public _router: Router,
				public _usuarioService: UsuarioService) { }

	ngOnInit() {

		init_plugins ();

		this.googleInit();

		this.email = localStorage.getItem('email') || '';	// si 'email' está undefined le asigno una cadena vacía

		if ( this.email.length > 1 ) {
			this.recuerdame = true;
		}
	}


	googleInit() {

		gapi.load('auth2', () => {

			this.auth2 = gapi.auth2.init( {
				client_id: '495916940547-maddoe5cdf9hqislagn6jeeanhk8o6rc.apps.googleusercontent.com',
				cookiepolicy: 'single_host_origin',
				scope: 'profile email'
			});

			this.attachSignin( document.getElementById('btnGoogle'));
		});
	}



	attachSignin ( element) {

		this.auth2.attachClickHandler( element, {}, (googleUser) => {

			// let profile = googleUser.getBasicProfile(); Trae todo el perfil

			let token = googleUser.getAuthResponse().id_token;

			this._usuarioService.loginGoogle( token )
				.subscribe( () => 

					//console.log(resp);

					//this._router.navigate(['/dashboard']); // Se comento porque genera problemas en la plantilla, no carga el init_plugins()
					window.location.href = '#/dashboard'
					
				);

			console.log(token);
			
		})
	}

	ingresar ( forma: NgForm) {

		
		if ( forma.invalid ) {

			return;
		}

		let usuario = new Usuario( null, forma.value.email, forma.value.password);

		this._usuarioService.login( usuario, forma.value.recuerdame)
			.subscribe( resp => this._router.navigate(['/dashboard']) );
		// console.log(forma.valid);
		// console.log(forma.value);
		
	}

}
