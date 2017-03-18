import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { DetalhaNota } from '../detalha-nota/detalha-nota';

import {IssServices} from '../services/issServices';

import { GlobalServices } from '../services/globalServices';

@Component({
  templateUrl: 'build/pages/consultar-nota/consultar-nota.html',
  providers: [IssServices]
})

export class ConsultarNota 
{
	infoNota: string;
	infoUsuarioJSON: any;
	login: any;
	senha: any;
	municipio: any;

	constructor(private nav: NavController, private navParams: NavParams, private issServices: IssServices, public globalServices: GlobalServices, public alertCtrl: AlertController) 
	{
		issServices.globalServices = globalServices;

		this.infoUsuarioJSON = JSON.parse(this.navParams.get('param1'));
		this.login = this.navParams.get('param2');
		this.senha = this.navParams.get('param3');
		this.municipio = this.navParams.get('param4');
	}

	buscaNotas()
	{
		var numNotus = (<HTMLInputElement>document.getElementById("numNota")).value;
		
		if(numNotus == "" || numNotus == null)
		{
			//alert("Digite um número de nota!");
            this.showAlert('', "Digite um número de nota!");
			return;
		}

		this.issServices.requisicaoPOSTBuscaNotas("", "", numNotus, this.login, this.senha);

		var resultJson = document.getElementById("demoConsultaNotas").textContent || document.getElementById("demoConsultaNotas").innerText || "";

		document.getElementById("demoConsultaNotas").innerHTML = resultJson;
		
		console.log(JSON.stringify(JSON.parse(resultJson)));

		this.infoNota = JSON.stringify(JSON.parse(resultJson).dados);

		this.goToDetalhaNota();
	}

	goToDetalhaNota()
	{
		this.nav.push(DetalhaNota, {param1: this.infoNota, param2: this.login, param3: this.senha, param4: this.municipio});
	}

	showAlert(mensagem, titulo) 
    {
        let alert = this.alertCtrl.create({
          title: titulo,
          subTitle: mensagem,
          buttons: ['OK']
        });
        alert.present();
    }

}
