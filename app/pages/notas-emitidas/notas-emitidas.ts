import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {IssServices} from '../services/issServices';

@Component({
  templateUrl: 'build/pages/notas-emitidas/notas-emitidas.html',
  providers: [IssServices]
})

export class NotasEmitidas 
{
	asNotas: any;
	municipio: any;

	constructor(private nav: NavController, private navParams: NavParams, private issServices: IssServices) 
	{
  		this.asNotas = JSON.parse(this.navParams.get('param1'));
  		this.municipio = this.navParams.get('param4');
	}
}
