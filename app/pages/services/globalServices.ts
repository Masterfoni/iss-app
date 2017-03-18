import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import {File} from 'ionic-native';

import 'rxjs/add/operator/map';

export class GlobalServices 
{  
    loginPadrao: string;
    senhaPadrao: string;
    urlWebservice: string;
    urlNota: string;

    static get parameters() 
    {
        return [[Http]];
    }
  
    constructor(private http:Http) 
    {
         this.loginPadrao = "";
         this.senhaPadrao = "";
         this.urlWebservice = "";
         this.urlNota = "";
    }

    setLoginPadrao(valor)
    {
        this.loginPadrao = valor;
    }

    setSenhaPadrao(valor)
    {
        this.senhaPadrao = valor;
    }

    setUrlWebservice(valor)
    {
        this.urlWebservice = valor;
    }

    setUrlNota(valor)
    {
        this.urlNota = valor;
    }

    getLoginPadrao()
    {
        return this.loginPadrao;
    }

    getSenhaPadrao()
    {
        return this.senhaPadrao;
    }

    getUrlWebservice()
    {
        return this.urlWebservice;
    }

    getUrlNota()
    {
        return this.urlNota;
    }
}