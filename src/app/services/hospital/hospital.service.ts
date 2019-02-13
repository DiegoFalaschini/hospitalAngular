import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
declare var swal: any;

@Injectable()
export class HospitalService {

	totalHospitales: number = 0;

	constructor( public http: HttpClient, public _usuarioService: UsuarioService ) { }


	cargarHospitales(desde: number = 0) {

		let url = URL_SERVICIOS + '/hospital?desde=' + desde;

		return this.http.get( url )
			.map( (resp: any) => {

				this.totalHospitales = resp.total;

				return resp.hospitales;
			});
	}


	obtenerHospital( id: string ) {

		let url = URL_SERVICIOS + '/hospital/' + id;
		

		return this.http.get( url )
			.map( (resp:any) => {

				return resp.hospital;
			});
	}


	/**
	 * Recibe un ID de un hospital y lo borra
	 * @param id 
	 */
	borrarHospital( id: string ) {

		let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

		return this.http.delete( url )
			.map( () => { 
				
				swal('Hospital borrado', "el hospital ha sido eliminado correctamente", 'success');

				return true
			} );
	} 
 
	/**
	 * Recibe el nombre del hospital y lo crea.
	 * @param nombre 
	 */
	crearHospital( nombre: string ) {

		let url = URL_SERVICIOS + '/hospital';
		url += '?token=' + this._usuarioService.token;

		return this.http.post( url, { nombre })
			.map( (resp: any) => resp.hospital );

	} 


	/**
	 * Recibe el término de búsqueda y retorna todos los hospitales que coincidan con ese término de búsqueda.
	 * @param termino 
	 */
	buscarHospital( termino: string ) {

		let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

		return this.http.get( url )
			.map( (resp: any) => {

				console.log(resp);

				return resp.hospital;
				
				
			})
	}


	/**
	 * Recibe un hospital y lo actualiza.
	 * @param hospital 
	 */
	actualizarHospital( hospital: Hospital ) {
		
		let url = URL_SERVICIOS + '/hospital/' + hospital._id;
		url += '?token=' + this._usuarioService.token;
	

		return this.http.put( url, hospital )
			.map( (resp: any) => {
			
				swal("Hospital actualizado", "El hospital " + resp.hospital.nombre + " ha sido actualizado", "success")
				return resp.hospital
			} );
	}	

}
