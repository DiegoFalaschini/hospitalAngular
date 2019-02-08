import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

	constructor() { }

	// otra manera de hacerlo (comentario de la clase 172): https://www.codingforentrepreneurs.com/blog/file-upload-with-angular/
	/**
	 * 
	fileUpload(fileItem: File, tipo: string, id: string) {
		const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

		const formData: FormData = new FormData();

		formData.append('imagen', fileItem, fileItem.name);

		return this.http.put(url, formData, { reportProgress: true });
	}
	 */

	subirArchivo( archivo: File, tipo: string,  id: string) {

		return new Promise ( (resolve, reject ) => {

			let formData = new FormData();
			let xhr = new XMLHttpRequest();

			formData.append( 'imagen', archivo, archivo.name);

			xhr.onreadystatechange = function() {

				if ( xhr.readyState === 4 ) {

					if ( xhr.readyState === 4 ) {

						if ( xhr.status === 200 ) {

							console.log('imagen subida');

							resolve ( JSON.parse( xhr.response ) );
							
						} else {

							console.log('Fallo al subir el archivo');

							reject( JSON.parse( xhr.response ));
							
						}
					}
				}
			};

			let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

			xhr.open( 'PUT', url, true);
			xhr.send( formData );

		});

	}
}
