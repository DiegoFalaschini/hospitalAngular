import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

	constructor(@Inject(DOCUMENT) private _document,
					public _ajustes: SettingsService) { 
						
						
					}

	ngOnInit() {
		this.colocarChek();
	}

  	cambiarColor (tema: string, link: any) {
	  	console.log(tema);

	//   let url = `assets/css/colors/${tema}.css`;

	//   this._document.getElementById('tema').setAttribute('href', url);

	//   this.aplicarCheck(link);


	//   this._ajustes.ajustes.tema = tema;
	//   this._ajustes.ajustes.temaUrl = url;
	//   this._ajustes.guardarAjustes();

		this._ajustes.aplicarTema(tema);
		this.aplicarCheck(link);
		
  	}

  	aplicarCheck (link: any) {
		let selectores: any = document.getElementsByClassName('selector');

		for (let ref of selectores) {
			ref.classList.remove('working')
		}

		link.classList.add('working');

		//this.colocarChek();

	}

	colocarChek() {

		let selectores: any = document.getElementsByClassName('selector');

		let tema = this._ajustes.ajustes.tema;

		for (let ref of selectores) {

			if ( ref.getAttribute('data-theme') === tema)
			{			
				
				ref.classList.add('working')
				break;
			}
		}
	}	
}
