import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';

import {IssServices} from '../services/issServices';

import { GlobalServices } from '../services/globalServices';

@Component({
  templateUrl: 'build/pages/detalha-nota/detalha-nota.html',
  providers: [IssServices]
})

export class DetalhaNota 
{
	asNotas: any;
	
	login: string;
	senha: string;
    municipio: any;

	constructor( private navCtrl: NavController, private navParams: NavParams, private issServices: IssServices, public globalServices: GlobalServices, public alertCtrl: AlertController) 
	{
		issServices.globalServices = globalServices;
		this.asNotas = JSON.parse(this.navParams.get('param1'));
		this.login = this.navParams.get('param2');
		this.senha = this.navParams.get('param3');
        this.municipio = this.navParams.get('param4');

        this.asNotas[0].discriminacao = decodeURIComponent(this.utf8Decode(this.asNotas[0].discriminacao));
        this.asNotas[0].tomador_nome = decodeURIComponent(this.utf8Decode(this.asNotas[0].tomador_nome));
	}



	enviarSegundaVia()
	{		
		var xhttp = new XMLHttpRequest();
        var data = new FormData();

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', this.login);
        data.append('senhaApp', this.senha);
        data.append('numeroNota', this.asNotas[0].numero);

 		console.log(this.globalServices.getUrlNota());

        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById("demoDetalhaNota").innerHTML = this.responseText;  

                return;
            }
        };

        xhttp.open("POST",""+this.globalServices.getUrlWebservice()+"/ws_email.php", false);
        xhttp.send(data);

        var resultJson = document.getElementById("demoDetalhaNota").textContent || document.getElementById("demoDetalhaNota").innerText || "";

        document.getElementById("demoConsultaNotas").innerHTML = resultJson;
                
        this.showAlert('', JSON.parse(resultJson).status_msg);
	}

	visualizarNota()
	{
		var estring = ""+this.globalServices.getUrlNota()+"/imprimir_nota.php?cod="+this.asNotas[0].linknf;
		this.launch(estring);
	}

    launch(url) 
    {
        return new Promise(function(resolve, reject) {
            let browser = InAppBrowser.open(url, '_system');
            // ... code ...
        });
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

    utf8Decode(utf8String) 
    {
        if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
        // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
        const unicodeString = utf8String.replace(
            /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
            function(c) {  // (note parentheses for precedence)
                var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
                return String.fromCharCode(cc); }
        ).replace(
            /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
            function(c) {  // (note parentheses for precedence)
                var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
                return String.fromCharCode(cc); }
        );
        return unicodeString;
    }

}
