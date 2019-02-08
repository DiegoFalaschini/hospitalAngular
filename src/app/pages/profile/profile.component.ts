import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

	usuario: Usuario;

	imagenSubir: File;
	imagenTemp: string;

	constructor( public _usuarioService: UsuarioService) { 

		this.usuario = _usuarioService.usuario;
	}

	ngOnInit() {


	}

	guardar ( usuario: Usuario) {

		this.usuario.nombre = usuario.nombre;

		if ( !this.usuario.google ) {

			this.usuario.email = usuario.email;
		}

		this._usuarioService.actualizarUsuario( this.usuario ).subscribe();
	}


	seleccionImage( archivo: File ) {

		if ( !archivo ) {

			this.imagenSubir = null;

			return;
		}

		if (archivo.type.indexOf( 'image') < 0 ) {

			swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');

			this.imagenSubir = null;

			return;			
		}

		this.imagenSubir = archivo;

		// JS puro
		let reader = new FileReader();
		let urlImagenTemp = reader.readAsDataURL( archivo );

		reader.onloadend = () => this.imagenTemp = reader.result.toString();

		


		console.log(archivo);
		 
	}


	cambiarImagen() {

		this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
	}
}
