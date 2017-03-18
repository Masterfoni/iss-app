import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotasEmitidas } from '../notas-emitidas/notas-emitidas';

import {IssServices} from '../services/issServices';

import { GlobalServices } from '../services/globalServices';

@Component({
  templateUrl: 'build/pages/consultar-nota-data/consultar-nota-data.html',
  providers: [IssServices]
})

export class ConsultarNotaData
{
	asNotas: any;
	infoNota: string;
	infoUsuario: any;
	login: any;
	senha: any;
	municipio: any;

	constructor(private nav: NavController, private navParams: NavParams, private issServices: IssServices, public globalServices: GlobalServices) 
	{
		this.infoUsuario = this.navParams.get('param1');
		this.login = this.navParams.get('param2');
		this.senha = this.navParams.get('param3');
		this.municipio = this.navParams.get('param4');

		issServices.globalServices = globalServices;
	}

	goToNotasEmitidas()
	{
		this.listaNotas(this.infoUsuario, this.login, this.senha);
		this.nav.push(NotasEmitidas, {param1: this.asNotas, param2: this.municipio});
	}

	listaNotas(infoUsuario, login, senha)
	{
		var dataini = ""+(<HTMLInputElement>document.getElementById('dataInicio')).value;
		var datafim = ""+(<HTMLInputElement>document.getElementById('dataFim')).value;

		this.issServices.requisicaoPOSTListaNotas(dataini,datafim, "", login, senha);

		var resultJson = document.getElementById("demoConsultaNotasData").textContent || document.getElementById("demoConsultaNotasData").innerText || "";

		document.getElementById("demoConsultaNotasData").innerHTML = resultJson;
		
		console.log(JSON.stringify(JSON.parse(resultJson).dados));

		this.asNotas = JSON.stringify(JSON.parse(resultJson).dados);
	}

}
