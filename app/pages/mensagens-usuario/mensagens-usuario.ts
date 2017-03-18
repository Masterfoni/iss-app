import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DetalhaMensagem} from '../detalha-mensagem/detalha-mensagem';

import {IssServices} from '../services/issServices';

import { GlobalServices } from '../services/globalServices';

@Component({
  templateUrl: 'build/pages/mensagens-usuario/mensagens-usuario.html',
  providers: [IssServices]
})

export class MensagensUsuario 
{
	infoUsuario: any;
	mensagens: any;
	municipio: any;

	constructor(private nav: NavController, private navParams: NavParams, private issServices: IssServices, public globalServices: GlobalServices) 
	{
		issServices.globalServices = globalServices;

  		this.infoUsuario = JSON.parse(this.navParams.get('param1'));
  		this.municipio = this.navParams.get('param4');
	}

	onPageLoaded()
	{
		this.mensagens = this.infoUsuario.dados[0].mensagens;
	}

	goToMensagens(valor)
	{
		this.nav.push(DetalhaMensagem, {param1: valor.innerText, param2: this.municipio})
	}
}
