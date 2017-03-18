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

        xhttp.open("POST",""+this.globalServices.getUrlWebservice()+"/ws_buscatomador.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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

        xhttp.open("POST", ""+this.globalServices.getUrlWebservice()+"/ws_buscanotas.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }
    
    requisicaoPOSTCancelaNota(numNota, motivoNota, login, senha)
    {
        // var login = "67.261.788/0001-60"; 
        // var senha = "123456";        
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

        xhttp.open("POST", ""+this.globalServices.getUrlWebservice()+"/ws_cancelanota.php", false);
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

        xhttp.open("POST", ""+this.globalServices.getUrlWebservice()+"/ws_gerarnota.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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

        xhttp.open("POST", ""+this.globalServices.getUrlWebservice()+"/ws_buscanotas.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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

        xhttp.open("POST", ""+this.globalServices.getUrlWebservice()+"/ws_buscanotas.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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

        xhttp.open("POST", ""+this.globalServices.getUrlWebservice()+"/ws_buscanotas.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }

    requisicaoPOSTLogin(urlWebservice, login, senha, loginPadrao, senhaPadrao)
    {
        //45.922.746/0001-90
        // login = "67.261.788/0001-60";
        // senha = "123456";        
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

        xhttp.open("POST", ""+urlWebservice+"/ws_dadoslogin.php", false);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }


    //============================================================================================================================
    //============================================================================================================================
    //============================================================================================================================
    //============================================================================================================================
    conectarPrefeituras()
    {
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', 'agillApp01');
        data.append('senha', 'p@SsApp00#');


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demo");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", "http://www.agill.com.br/app_servicos/ws_prefeituras.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }

}