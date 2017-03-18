import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {IssServices} from '../services/issServices';

@Component({
  templateUrl: 'build/pages/detalha-mensagem/detalha-mensagem.html',
  providers: [IssServices]
})

export class DetalhaMensagem 
{
	amsg: any;
	municipio: any;
	
	constructor(private navCtrl: NavController, private navParams: NavParams, private issServices: IssServices) 
	{
		this.amsg = this.navParams.get('param1');
		this.municipio = this.navParams.get('param2');
	}

}
