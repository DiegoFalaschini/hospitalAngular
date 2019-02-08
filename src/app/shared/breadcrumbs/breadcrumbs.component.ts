import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

	titulo: string = '';

	constructor(private _router: Router,
				private title: Title,
				private meta: Meta) {
		
		this.getDataRoute().subscribe(data  => {


			this.titulo = data.titulo;
			this.title.setTitle( data.titulo );	// Titulo de la pestaña  del navegador

			const metaTag: MetaDefinition = {
				name: 'description',
				content: this.titulo
			};

			this.meta.updateTag( metaTag );
		});
	}

  ngOnInit() {
  }

  getDataRoute() {

	return this._router.events.pipe( 

		filter ( evento => evento instanceof ActivationEnd),
		filter ( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
		map ( (evento: ActivationEnd ) => evento.snapshot.data )
	);
  }

}
