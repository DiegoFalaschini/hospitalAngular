import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
declare var swal: any;

@Injectable()
export class MedicoService {

	totalMedicos: number = 0;
	
	constructor( public http: HttpClient, public _usuarioService: UsuarioService) { }


	cargarMedicos() {
		
		let url = URL_SERVICIOS + '/medico';

		return this.http.get ( url )
			.map( (resp:any) => {

				console.log(resp);

				this.totalMedicos = resp.total;
				 return resp.medicos;
			})
	}

	buscarMedicos ( termino: string ) {

		let url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

		return this.http.get( url )
			.map( (resp: any) => {
				
				console.log(resp);
				
				return resp.medico;
			});
	}	
	
	
	borrarMedico ( id ) {

		let url = URL_SERVICIOS + '/medico/' + id;
		url += '?token=' + this._usuarioService.token;

		return this.http.delete( url )
			.map( resp => {
				swal( 'Medico Borrado', 'Medico borrado correctamente', 'success')

				return resp;
			});
	}

	guardarMedico( medico: Medico) {

		let url = URL_SERVICIOS + '/medico';


		if ( medico._id ) {
			// Actualizando Médico

			url += '/' + medico._id;
			url += '?token=' + this._usuarioService.token;

			return this.http.put( url, medico )
				.map( (resp: any) => {

					swal('Medico actualizado', medico.nombre, 'success');

					console.log('Servicio:');
					
					console.log(resp);

					return resp;
				});

		} else {
			// Creando Medico
			url += '?token=' + this._usuarioService.token;

			console.log(medico);
			

			return this.http.post( url, medico )
				.map ( (resp:any) => {

					swal('Medico creado', medico.nombre, 'success');

					return resp.medico;
				})
		}

	}


	cargarMedico( id: string ) {

		let url = URL_SERVICIOS + '/medico/' + id;

		return this.http.get( url )
			.map( (resp: any) => resp.medico);
	}
}
