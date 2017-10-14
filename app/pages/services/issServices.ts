import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import {File} from 'ionic-native';

import 'rxjs/add/operator/map';

import { GlobalServices } from '../services/globalServices';

export class IssServices 
{  
    static get parameters() 
    {
        return [[Http]];
    }

    constructor(private http:Http, public globalServices: GlobalServices) 
    {
         
    }

    requisicaoPOSTBuscaTomador(dadoTomador, login, senha)
    {
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', login);
        data.append('senhaApp', senha);
        data.append('cnpjtomador', dadoTomador);


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demobuscatomador");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", this.globalServices.getUrlWebservice(), false);
        xhttp.send(data);
    }

    requisicaoPOSTEnviaConsultaNota(dataini, datafim, numerus, login, senha)
    {     
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', login);
        data.append('senhaApp', senha);
        data.append('numero', numerus);
        data.append('dataini', dataini);
        data.append('datafim', datafim);


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demoenvius");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", this.globalServices.getUrlWebservice(), false);
        xhttp.send(data);
    }
    
    requisicaoPOSTCancelaNota(numNota, motivoNota, login, senha)
    {
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', login);
        data.append('senhaApp', senha);
        data.append('numero', numNota);
        data.append('motivo', motivoNota);


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demoCancelaNota");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", this.globalServices.getUrlWebservice(), false);
        xhttp.send(data);
    }

    requisicaoPOSTCriaNota(notaString, login, senha)
    {      
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        var umBlob = new Blob(notaString.split(''), {type: 'text/xml'});
        
        console.log(umBlob);

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', login);
        data.append('senhaApp', senha);
        data.append('import', umBlob, "nota.xml");


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demoCrianota");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", this.globalServices.getUrlWebservice(), false);
        xhttp.send(data);
    }


    requisicaoPOSTBuscaNotas(dataini, datafim, numerus, login, senha)
    {     
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', login);
        data.append('senhaApp', senha);
        data.append('numero', numerus);
        data.append('dataini', dataini);
        data.append('datafim', datafim);


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demoConsultaNotas");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", this.globalServices.getUrlWebservice(), false);
        xhttp.send(data);
    }

   
    requisicaoPOSTListaNotas(dataini, datafim, numerus, login, senha)
    {    
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', login);
        data.append('senhaApp', senha);
        data.append('numero', numerus);
        data.append('dataini', dataini);
        data.append('datafim', datafim);


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demoConsultaNotasData");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", this.globalServices.getUrlWebservice(), false);
        xhttp.send(data);
    }

    requisicaoPOSTListaNotasHome(dataini, datafim, numerus, login, senha)
    {    
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', this.globalServices.getLoginPadrao());
        data.append('senha', this.globalServices.getSenhaPadrao());
        data.append('loginApp', login);
        data.append('senhaApp', senha);
        data.append('numero', numerus);
        data.append('dataini', dataini);
        data.append('datafim', datafim);


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demoHomepage");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", this.globalServices.getUrlWebservice(), false);
        xhttp.send(data);
    }

    requisicaoPOSTLogin(urlWebservice, login, senha, loginPadrao, senhaPadrao)
    {
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', loginPadrao);
        data.append('senha', senhaPadrao);
        data.append('loginApp', login);
        data.append('senhaApp', senha);

        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demo");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", urlWebservice, false);
        xhttp.send(data);
    }


    conectarPrefeituras()
    {
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', 'REMOVIDO-PRIVADO');
        data.append('senha', 'REMOVIDO-PRIVADO');


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demo");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", "REMOVIDO-PRIVADO", false);
        xhttp.send(data);
    }

}