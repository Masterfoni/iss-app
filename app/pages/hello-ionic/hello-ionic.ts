import { Component, Injectable } from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {IssServices} from '../services/issServices';

import {Mask} from '../../directives/mask';

import {HomePage} from '../homepage/homepage';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  providers: [IssServices],
  directives: [Mask]
})

export class HelloIonicPage 
{  
	movies: Array<any>;
	postData: string;

    arrayServicos: any;
    login: string;
    senha: string;

    loginPadrao: string;
    senhaPadrao: string;
    uf: string;
    urlWebservice: string;
    urlNota: string;
    arrayDados: any;
    novoArray: any;
    municipio: any;

	constructor(http: Http, private nav: NavController,  private issServices: IssServices, private viewCtrl: ViewController, public alertCtrl: AlertController) 
	{
        
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

    testar()
    {
        this.uf = this.arrayDados[0].uf;
        this.urlWebservice = this.arrayDados[0].link_webservice;
        this.loginPadrao = this.arrayDados[0].usuario;
        this.senhaPadrao = this.arrayDados[0].senha;
        this.urlNota = this.arrayDados[0].link_nota;

        this.login = (<HTMLInputElement>document.getElementById("loginapp")).value;
        this.senha = (<HTMLInputElement>document.getElementById("senhaapp")).value;

        this.issServices.requisicaoPOSTLogin(this.urlWebservice, this.login, this.senha, this.loginPadrao, this.senhaPadrao);

         var resultJson;

        resultJson = document.getElementById("demo").textContent || document.getElementById("demo").innerText || "";

        var jsonResposta = JSON.parse(resultJson);
        
        if(jsonResposta.status == 1)
        {
            this.showAlert('', jsonResposta.status_msg);
        }
        else if(jsonResposta.status == 0)
        {
            this.goToHome(JSON.stringify(jsonResposta), this.login, this.senha, this.urlWebservice, this.loginPadrao, this.senhaPadrao, this.urlNota);
        }
    }

    persisteSelectTelaInicial(valor)
    {
        var i;

        for(i = 0; i < this.arrayDados.length; i++)
        {
            if(this.arrayDados[i].nome == valor)
            {
                this.municipio = this.arrayDados[i].nome;
                this.uf = this.arrayDados[i].uf;
                this.urlWebservice = this.arrayDados[i].link_webservice;
                this.loginPadrao = this.arrayDados[i].usuario;
                this.senhaPadrao = this.arrayDados[i].senha;
                this.urlNota = this.arrayDados[i].link_nota;
            }
        }
    }

	goToHome(informacoesUsuario, login, senha, urlWebservice, loginPadrao, senhaPadrao, urlNota)
	{
		this.nav.push(HomePage, {param1: informacoesUsuario, param2: login, param3: senha, param4: urlWebservice, param5: loginPadrao, param6: senhaPadrao, param7: urlNota, param8: this.municipio}).then(() => {
            const index = this.viewCtrl.index;
            this.nav.remove(index);
        });
	}

    logar()
    {
    	this.login = (<HTMLInputElement>document.getElementById("loginapp")).value;
    	this.senha = (<HTMLInputElement>document.getElementById("senhaapp")).value;
        
        if(this.login == null || this.login == "")
        {
            this.showAlert('',"Digite seu login!");
            return;
        }
        else if(this.senha == null || this.senha == "")
        {
            this.showAlert('',"Digite sua senha!");
            return;
        }
        else if(this.urlWebservice == null || this.urlWebservice == "")
        {
            this.showAlert('',"Municipio Invalido!");
            return;
        }


        var resultJson;

    	this.issServices.requisicaoPOSTLogin(this.urlWebservice, this.login, this.senha, this.loginPadrao, this.senhaPadrao);

        resultJson = document.getElementById("demo").textContent || document.getElementById("demo").innerText || "";

    	var jsonResposta = JSON.parse(resultJson);
    	
    	if(jsonResposta.status == 1)
    	{
            this.showAlert('', jsonResposta.status_msg);
    	}
    	else if(jsonResposta.status == 0)
    	{      
    		this.goToHome(JSON.stringify(jsonResposta), this.login, this.senha, this.urlWebservice, this.loginPadrao, this.senhaPadrao, this.urlNota);
    	}
    }

    mascaraCPFCNPJ()
    {
        if($("#loginapp").val().replace(/[^\d]+/g,'').length < 11)
        {
            (<any>$("#loginapp")).mask("?999.999.999-99");
        } 
        if($("#loginapp").val().replace(/[^\d]+/g,'').length >= 11)
        {
            (<any>$("#loginapp")).mask("?99.999.999/9999-99");
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

    foqueiIn()
    {
        (<any>$("#loginapp")).unmask();
    }

    foqueiOut()
    {
        if($("#loginapp").val().replace(/[^\d]+/g,'').length <= 11)
        {
            (<any>$("#loginapp")).mask("?999.999.999-99");
        } 
        if($("#loginapp").val().replace(/[^\d]+/g,'').length > 11)
        {
            (<any>$("#loginapp")).mask("?99.999.999/9999-99");
        }
    }

    mostraElemento()
    {
        document.getElementById('loadingImg').style.display = "";
        return;
    }
}
