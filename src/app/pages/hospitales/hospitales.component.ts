import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

	cargando: boolean = true;
	desde: number = 0;

	hospitales: Hospital[] = [];
	totalHospitales: number = 0;

	constructor( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService ) { }

	ngOnInit() {

		this.cargarHospitales();

		this._modalUploadService.notificacion
			.subscribe( () => this.cargarHospitales() );
	}


	mostrarModal( id: string ) {

		this._modalUploadService.mostrarModal( 'hospitales', id);
	}	

	cargarHospitales() {

		this.cargando = true;

		this._hospitalService.cargarHospitales( this.desde )
			.subscribe( (resp: any) => {

				this.totalHospitales = this._hospitalService.totalHospitales;

				this.hospitales = resp;

				console.log(this.totalHospitales);
				console.log(resp);
				
				this.cargando = false;

			})
	}


	obtenerHospital( id: string ) {

		this._hospitalService.obtenerHospital( id )
			.subscribe( (hospital: Hospital) => {

				console.log(hospital);
				
			})

	}


	/**
	 * Recibe un ID de un hospital y lo borra
	 * @param id 
	 */
	borrarHospital( id: string ) {

		swal( {
			title: '¿Esta seguro?',
			text: 'Esta a punto de borrar a ',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		})
		.then( borrar => {
			console.log(borrar);

			if ( borrar ) {

				return this._hospitalService.borrarHospital( id )
								.subscribe( (borrado: boolean)=> {

									this.cargarHospitales();
								} );

			}
		})
				

		
	} 

	/**
	 * Recibe el nombre del hospital y lo crea.
	 * 
	 */
	crearHospital( nombre: string ) {

		// swal( "Crear Hospital ");

		swal({
			title: "Crear Hospital",
			text: "Ingrese el nombre del hospital",
			content: "input",
			icon: 'info',
			buttons: true,
			dangerMode: true
		}).then( valor => {

			if (!valor || valor.length === 0) {
				return;
			}

			this._hospitalService.crearHospital( valor )
				.subscribe( () => this.cargarHospitales() );
		});
		  	
	} 


	/**
	 * Recibe el término de búsqueda y retorna todos los hospitales que coincidan con ese término de búsqueda.
	 * @param termino 
	 */
	buscarHospital( termino: string ) {

		this.cargando = true;

		if ( termino.length <= 0 ) {

			this.cargarHospitales();
		}

		this._hospitalService.buscarHospital( termino )
			.subscribe ( (hospitales: Hospital []) => {

				this.hospitales = hospitales;
				this.cargando = false;
			});
	}


	/**
	 * Recibe un hospital y lo actualiza.
	 * @param hospital 
	 */
	actualizarHospital( hospital: Hospital ) {
		
		this._hospitalService.actualizarHospital( hospital )
			.subscribe( () => this.cargarHospitales );
	}	


	cambiarDesde ( valor: number) {

		let desde = this.desde + valor;

		if ( desde >= this.totalHospitales ) {

			return;
		}

		if ( desde < 0 ) {
			return;
		}		

		this.desde += valor;
		this.cargarHospitales();
	}
}
