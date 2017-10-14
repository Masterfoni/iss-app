import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import {HomePage} from '../homepage/homepage';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

import {IssServices} from '../services/issServices';

import {SQLite} from "ionic-native";

@Component({
  templateUrl: 'build/pages/login-lembrado/login-lembrado.html',
  providers: [IssServices]
})
export class LoginLembrado 
{
    nomeUsuario: any;
    loginUsuario: any;
    municipio: any;

    public database: SQLite;

    arrayDados: any;
    novoArray: any;

    uf: any;
    urlWebservice: any;
    loginPadrao: any;
    senhaPadrao: any;
    urlNota: any;

	constructor(private nav: NavController, private navParams: NavParams, private issServices: IssServices, private viewCtrl: ViewController, public alertCtrl: AlertController) 
	{
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.refresh();
        }, (error) => {
            alert("Erro: " + error);
        });
	}

    onPageLoaded()
    {
        this.issServices.conectarPrefeituras();

        var resultJson = document.getElementById("demo").textContent || document.getElementById("demo").innerText || "";
       
        var jsonResposta = JSON.parse(resultJson);

        this.arrayDados = jsonResposta.dados;
        
        var i;

        this.novoArray = [];

        for(i = 0; i < this.arrayDados.length; i++)
        {
            if(this.arrayDados[i].nome != null)
                this.novoArray.push(this.arrayDados[i]);
        }
    }

    public refresh() 
    {
        this.database.executeSql("SELECT * FROM people3", []).then((data) => {
            if(data.rows.length > 0) 
            {
                for(var i = 0; i < data.rows.length; i++) 
                {
                    this.nomeUsuario = data.rows.item(i).firstname;
                    this.loginUsuario = data.rows.item(i).login;
                    this.municipio = data.rows.item(i).lastname;

                    (<HTMLInputElement>document.getElementById('idNomeMunicipius')).value = this.municipio;
                    (<HTMLInputElement>document.getElementById('idLoginLembrado')).value = this.loginUsuario;
                    (<HTMLInputElement>document.getElementById('idNomeEmpresa')).value = this.nomeUsuario;
                }
            }
        }, (error) => {
            alert("ERROR: " + JSON.stringify(error));
        });
    }

    logar()
    {
        var login = (<HTMLInputElement>document.getElementById("idLoginLembrado")).value;
        var senha = (<HTMLInputElement>document.getElementById("idSenhaLembrada")).value;
        var resultJson;

        var i;

        for(i = 0; i < this.arrayDados.length; i++)
        {
            if(this.arrayDados[i].nome == this.municipio)
            {
                this.municipio = this.arrayDados[i].nome;
                this.uf = this.arrayDados[i].uf;
                this.urlWebservice = this.arrayDados[i].link_webservice;
                this.loginPadrao = this.arrayDados[i].usuario;
                this.senhaPadrao = this.arrayDados[i].senha;
                this.urlNota = this.arrayDados[i].link_nota;
            }
        }

        this.issServices.requisicaoPOSTLogin(this.urlWebservice, login, senha, this.loginPadrao, this.senhaPadrao);

        resultJson = document.getElementById("demo").textContent || document.getElementById("demo").innerText || "";

        var jsonResposta = JSON.parse(resultJson);
        
        if(jsonResposta.status == 1)
        {
            this.showAlert('', jsonResposta.status_msg);
        }
        else if(jsonResposta.status == 0)
        {      
            this.goToHome(JSON.stringify(jsonResposta), login, senha, this.urlWebservice, this.loginPadrao, this.senhaPadrao, this.urlNota);
        }
    }

    goToHome(informacoesUsuario, login, senha, urlWebservice, loginPadrao, senhaPadrao, urlNota)
    {
        this.nav.push(HomePage, {param1: informacoesUsuario, param2: login, param3: senha, param4: urlWebservice, param5: loginPadrao, param6: senhaPadrao, param7: urlNota, param8: this.municipio}).then(() => {
        const index = this.viewCtrl.index;
        this.nav.remove(index);
        });
    }

    outraConta()
    {
        this.nav.setRoot(HelloIonicPage)
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
