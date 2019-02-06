import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


// import * as swal from 'sweetalert';  Ya no sería necesaria.
// Pueden usar esta como aparece en la documentación sin problemas.
import swal from 'sweetalert'; 
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


declare function init_plugins (); // CLASE 64



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

	forma: FormGroup;

	constructor(
		public _usuarioService: UsuarioService,
		public router: Router
	) { }

	ngOnInit() {

		init_plugins();

	

		this.forma = new FormGroup( {

			nombre: new FormControl( null, Validators.required ),
			correo: new FormControl( null, [Validators.required, Validators.email]), 
			password: new FormControl(null, Validators.required),
			password2: new FormControl(null, Validators.required),
			condiciones: new FormControl(false),
		}, { validators: this.sonIguales('password', 'password2')});


		this.forma.setValue( {
			nombre: 'Diego',
			correo: 'diego@yahoo.com',
			password: '123',
			password2: '123',
			condiciones: true
		});	

	}


	sonIguales(campo1: string, campo2: string) {

		return ( group: FormGroup ) => {
			let pass1 = group.controls[campo1].value;
			let pass2 = group.controls[campo2].value;

			if (pass1 === pass2) {

				return null
			}

			return {
				sonIguales: true
			}
		}
	}

	registrarUsuario () {


		if ( this.forma.invalid) {

			return;
		}

		if ( !this.forma.value.condiciones ) {

			console.log('Debe aceptar las condiciones');

			swal ('Importante', 'Debe aceptar las condiciones', 'warning');
			
			return;
		}
		console.log('Forma valida:', this.forma.valid);
		
		// console.log(this.forma.value);



		let usuario = new Usuario(
			this.forma.value.nombre,
			this.forma.value.correo,
			this.forma.value.password
		);


		this._usuarioService.crearUsuario(usuario)
			.subscribe (resp => {
				
				console.log(resp);
				this.router.navigate(['/login']);
				
			});
		
	}

}
