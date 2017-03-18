import { Component } from '@angular/core';
import {AlertController, NavController, NavParams } from 'ionic-angular';

import {IssServices} from '../services/issServices';

import { GlobalServices } from '../services/globalServices';

@Component({
  templateUrl: 'build/pages/cancelar-nota/cancelar-nota.html',
  providers: [IssServices]
})
export class CancelarNota 
{

    infoUsuario: any;
    login: string;
    senha: string;
    municipio: any;

	constructor(private navCtrl: NavController, private navParams: NavParams, private issServices: IssServices, public globalServices: GlobalServices, public alertCtrl: AlertController) 
	{
        issServices.globalServices = globalServices;

        this.infoUsuario = this.navParams.get('param1');
        this.login = this.navParams.get('param2');
        this.senha = this.navParams.get('param3');
        this.municipio = this.navParams.get('param4');
	}

	cancelaNota()
	{
		var numeronota = (<HTMLInputElement>document.getElementById("numNotaCancelamento")).value;
		var razaocancel =(<HTMLInputElement>document.getElementById("razaoCancelamento")).value;

		this.issServices.requisicaoPOSTCancelaNota(numeronota, razaocancel, this.login, this.senha);

		var resultJson = document.getElementById("demoCancelaNota").textContent || document.getElementById("demoCancelaNota").innerText || "";
		var jsonResposta = JSON.parse(resultJson);

		document.getElementById("demoCancelaNota").innerHTML = resultJson;

        if(jsonResposta.status == 1)
        {
            // alert(jsonResposta.status_msg);
            this.showAlert('', jsonResposta.status_msg);
        }
        else if(jsonResposta.status == 0)
        {
        	if(jsonResposta.dados[0].tipo == "C")
        	{
        		//alert("Cancelamento Realizado!");
                this.showAlert('', "Cancelamento Realizado!");
        	}
        	else if(jsonResposta.dados[0].tipo == "S")
        	{
        		//alert("Solicitação de Cancelamento Realizada.");
                this.showAlert('', "Solicitação de Cancelamento Realizada!")
        	}
        }
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
