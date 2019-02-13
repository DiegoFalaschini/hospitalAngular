import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {


	cargando: boolean = false;

	medicos: Medico[] = [];

	constructor( public _medicoService: MedicoService ) { }

	ngOnInit() {

		this.cargarMedicos();
	}

	cargarMedicos() {

		this._medicoService.cargarMedicos()
			.subscribe( medicos => this.medicos = medicos);
	}

	buscarMedico( termino: string ) {

		if (termino.length <= 0) {
			return;
		}

		this._medicoService.buscarMedicos( termino )
			.subscribe ( medicos => this.medicos = medicos );
	}


	borrarMedico ( medico: Medico ) {

		this._medicoService.borrarMedico( medico._id )
			.subscribe( resp => {

				this.cargarMedicos();
			})
	}
}
