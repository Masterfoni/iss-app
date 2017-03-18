import { Component } from '@angular/core';
import {Http, Request, RequestMethod} from "@angular/http";
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { EmailComposer } from 'ionic-native';

import {IssServices} from '../services/issServices';

import { GlobalServices } from '../services/globalServices';

@Component({
  templateUrl: 'build/pages/enviar-nota/enviar-nota.html',
  providers: [IssServices]
})

export class EnviarNota 
{
	login: any;
	senha: any;
	http: Http;

    municipio: any;

	infoUsuario: any;

	constructor(private navCtrl: NavController, private navParams: NavParams, private issServices: IssServices, public globalServices: GlobalServices, public alertCtrl: AlertController) 
	{
		issServices.globalServices = globalServices;
		this.infoUsuario = this.navParams.get('param1');
		this.login = this.navParams.get('param2');
		this.senha = this.navParams.get('param3');
		this.municipio = this.navParams.get('param4');
	}

	enviaEmail()
	{
		var numNotus = (<HTMLInputElement>document.getElementById('numNotaEnvio')).value;
		var emailEnvius = (<HTMLInputElement>document.getElementById('emailEnvio')).value;
		
		if(numNotus == null || numNotus == "")
		{
			//alert("Preencha o número da sua nota!");
			this.showAlert('', 'Preencha o número da sua nota!');
			return;
		}
		// if(emailEnvius == null || emailEnvius == "")
		// {
		// 	//alert("Preencha o e-mail do destinatário!");
		// 	this.showAlert('', 'Preencha o e-mail do destinatário!');
		// 	return;
		// }

		this.issServices.requisicaoPOSTEnviaConsultaNota("", "", numNotus, this.login, this.senha);

		var resultJson = document.getElementById("demoenvius").textContent || document.getElementById("demoenvius").innerText || "";

		document.getElementById("demoenvius").innerHTML = resultJson;
		
		console.log(JSON.stringify(JSON.parse(resultJson).dados));

		var linkNota = JSON.parse(resultJson).dados[0].linknf;
		var nomeRemetente = JSON.parse(resultJson).dados[0].prestador_razaosocial;

		var xhttp = new XMLHttpRequest();

        var data = new FormData();

        console.log(nomeRemetente);
        console.log(emailEnvius);
        console.log(linkNota);

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', this.login);
        data.append('senhaApp', this.senha);
        data.append('numeroNota', numNotus);
        
        if(emailEnvius != null || emailEnvius != "")
        	data.append('email', emailEnvius);
 
        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById("demoenvius").innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST",""+this.globalServices.getUrlWebservice()+"/ws_email.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);

        var resultJson = document.getElementById("demoenvius").textContent || document.getElementById("demoenvius").innerText || "";

        document.getElementById("demoenvius").innerHTML = resultJson;
              
        if(JSON.parse(resultJson).status == 0)
        {
        	this.showAlert('', "E-mail enviado e tomador notificado.");
        }
        else if(JSON.parse(resultJson).status == 1)
        {
        	this.showAlert('', JSON.parse(resultJson).status_msg);
        }
        
	}

	showAlert(titulo, mensagem) 
    {
        let alert = this.alertCtrl.create({
          title: titulo,
          subTitle: mensagem,
          buttons: ['OK']
        });
        alert.present();
    }

}
