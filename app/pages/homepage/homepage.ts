import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NotasEmitidas} from '../notas-emitidas/notas-emitidas';
import {NovaNota} from '../nova-nota/nova-nota';
import {EnviarNota} from '../enviar-nota/enviar-nota';
import {CancelarNota} from '../cancelar-nota/cancelar-nota';
import {ConsultarNota} from '../consultar-nota/consultar-nota';
import {ConsultarNotaData} from '../consultar-nota-data/consultar-nota-data';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {MensagensUsuario} from '../mensagens-usuario/mensagens-usuario';

import {IssServices} from '../services/issServices';
import {SQLite} from "ionic-native";

import { GlobalServices } from '../services/globalServices';

@Component({
  templateUrl: 'build/pages/homepage/homepage.html',
  providers: [IssServices]
})

export class HomePage 
{
	login: any;
	senha: any;
	infoUsuario: string;
	asNotas: any;
	veilor: any;
	issVeilor: any;

	database: SQLite;
    people: Array<Object>;

    loginPadrao: string;
    senhaPadrao: string;
    urlWebservice: string;
    urlNota: string;
    municipio: any;

    actualColor: string;

  	constructor(private nav: NavController, private navParams: NavParams, private issServices: IssServices, public globalServices: GlobalServices) 
  	{
  		this.infoUsuario = this.navParams.get('param1');
  		this.login = this.navParams.get('param2');
  		this.senha = this.navParams.get('param3');

  		this.urlWebservice = this.navParams.get('param4');
  		this.loginPadrao = this.navParams.get('param5');
  		this.senhaPadrao = this.navParams.get('param6');
  		this.urlNota = this.navParams.get('param7');
  		this.municipio = this.navParams.get('param8');

  		console.log(this.municipio);

  		this.globalServices.setLoginPadrao(this.loginPadrao);
  		this.globalServices.setSenhaPadrao(this.senhaPadrao);
  		this.globalServices.setUrlWebservice(this.urlWebservice);
  		this.globalServices.setUrlNota(this.urlNota);

  		issServices.globalServices = globalServices;

  		this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.refresh();
            this.add();
            this.refresh();
        }, (error) => {
            alert("Erro: " + error);
        });

        if(JSON.parse(this.infoUsuario).dados[0].mensagens[0] != "" || JSON.parse(this.infoUsuario).dados[0].mensagens[0] != null)
        	setInterval(this.mudaCor, 1000);
  	}

  	goToConsultarNotaData()
  	{
  		this.nav.push(ConsultarNotaData, {param1: this.infoUsuario, param2: this.login, param3: this.senha, param4: this.municipio});
  	}

	goToNovaNota()
	{
		this.nav.push(NovaNota, {param1: this.infoUsuario, param2: this.login, param3: this.senha, param4: this.municipio});
	}

	goToEnviarNota()
	{
		this.nav.push(EnviarNota, {param1: this.infoUsuario, param2: this.login, param3: this.senha, param4: this.municipio});
	}

	goToCancelarNota()
	{
		this.nav.push(CancelarNota, {param1: this.infoUsuario, param2: this.login, param3: this.senha, param4: this.municipio});
	}

	goToConsultarNota()
	{
		this.nav.push(ConsultarNota, {param1: this.infoUsuario, param2: this.login, param3: this.senha, param4: this.municipio});
	}

	goToLoginScreen()
	{
		this.nav.push(HelloIonicPage);
		this.nav.setRoot(HelloIonicPage);
	}

	goToMensagensUsuario()
	{
		this.nav.push(MensagensUsuario, {param1: this.infoUsuario, param2: this.login, param3: this.senha, param4: this.municipio});
	}

	onPageLoaded()
	{
		this.carregaVeilor();
	}

	public refresh() 
	{
        this.database.executeSql("SELECT * FROM people3", []).then((data) => {
            this.people = [];
            if(data.rows.length > 0) 
            {
                for(var i = 0; i < data.rows.length; i++) 
                {
                	// alert(data.rows.item(i).lastname);
                	// alert(data.rows.item(i).firstname);
                	// alert(data.rows.item(i).login);
                    this.people.push({firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname, login: data.rows.item(i).login});
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    }

    public add() 
    {
    	// alert(JSON.stringify(JSON.parse(this.infoUsuario).dados[0].razaosocial));
    	// alert(this.municipio);
    	// alert(this.login);
        this.database.executeSql("INSERT OR REPLACE INTO people3 (id,firstname, lastname, login) VALUES (1, '"+JSON.stringify(JSON.parse(this.infoUsuario).dados[0].razaosocial)+"', '"+this.municipio+"', '"+this.login+"')", []).then((data) => {
        	//alert("Inserido: " + JSON.stringify(data));
        }, (error) => {
            alert("Erro: " + JSON.stringify(error.err));
        });
    }

    mudaCor()
    {
    	if(this.actualColor == "" || this.actualColor == "white" || this.actualColor == null)
    	{
    		document.getElementById("idJackson").style.color = "red";
    		this.actualColor = "red";
    	}
    	else if(this.actualColor == "red")
    	{
    		document.getElementById("idJackson").style.color = "white";
    		this.actualColor = "white";
    	}

    	document.getElementById("idMsgPraVc").style.display = "";
    }

    setCharAt(str,index,chr) 
    {
	    if(index > str.length-1) return str;
	    return str.substr(0,index) + chr + str.substr(index+1);
	}

	onPageDidEnter()
	{
		console.log(this.infoUsuario);
		this.carregaVeilor();
	}

	carregaVeilor()
	{
		var t = new Date();
		var data = new Date(t.getFullYear(), t.getMonth(), 1);
		var dataFim = new Date(t.getFullYear(), t.getMonth()+1, 0);

		var stringInicio = ""+data.getFullYear()+"-0"+data.getMonth()+"-0"+data.getDate()+"";
		var stringFim = ""+dataFim.getFullYear()+"-0"+dataFim.getMonth()+"-"+dataFim.getDate()+"";

		if(Number(data.getMonth())+1 < 10)
		{
			if(Number(data.getDate()) < 10)
				stringInicio = ""+data.getFullYear()+"-0"+(Number(data.getMonth())+1)+"-0"+data.getDate();
			else
				stringInicio = ""+data.getFullYear()+"-0"+(Number(data.getMonth())+1)+"-"+data.getDate();
		}
		else
		{
			if(Number(data.getDate()) < 10)
				stringInicio = ""+data.getFullYear()+"-"+(Number(data.getMonth())+1)+"-0"+data.getDate();
			else
				stringInicio = ""+data.getFullYear()+"-"+(Number(data.getMonth())+1)+"-"+data.getDate();
		}

		if(Number(dataFim.getMonth())+1 < 10)
		{
			if(Number(dataFim.getDate()) < 10)
				stringFim = ""+dataFim.getFullYear()+"-0"+(Number(data.getMonth())+1)+"-0"+dataFim.getDate();
			else
				stringFim = ""+dataFim.getFullYear()+"-0"+(Number(data.getMonth())+1)+"-"+dataFim.getDate();
		}
		else
		{
			if(Number(dataFim.getDate()) < 10)
				stringFim = ""+dataFim.getFullYear()+"-"+(Number(data.getMonth())+1)+"-0"+dataFim.getDate();
			else
				stringFim = ""+dataFim.getFullYear()+"-"+(Number(data.getMonth())+1)+"-"+dataFim.getDate();
		}


		console.log(stringInicio);
		console.log(stringFim);

		this.issServices.requisicaoPOSTListaNotasHome(stringInicio,stringFim,"",this.login,this.senha);

		var resultJson = document.getElementById("demoHomepage").textContent || document.getElementById("demoHomepage").innerText || "";

		document.getElementById("demoHomepage").innerHTML = resultJson;

		var ojson = JSON.parse(resultJson);

		this.veilor = JSON.parse(this.infoUsuario).dados[0].valornotas;
		// this.veilor = 0;

		// for(var i = 0; i < ojson.dados.length; i++)
		// {
		// 	if(ojson.dados[i].estado != "C")
		// 		this.veilor = Number(this.veilor) + Number(ojson.dados[i].valortotal);
		// }

		if(this.veilor != 0)
		{
			this.veilor = this.veilor.toString();

			if(this.veilor.charAt(this.veilor.length-3) == '.')
				this.veilor = this.setCharAt(this.veilor, this.veilor.length-3, ',');
			else if(this.veilor.charAt(this.veilor.length-2) == '.')
				this.veilor = this.setCharAt(this.veilor, this.veilor.length-2, ',');
			else
			{
				this.veilor = this.veilor+",00";
			}
		}
		else
		{
			this.veilor = this.veilor+",00";
		}

		this.issVeilor = JSON.parse(this.infoUsuario).dados[0].valoriss;

		// this.issVeilor = 0;

		// for(var i = 0; i < ojson.dados.length; i++)
		// {
		// 	if(ojson.dados[i].estado != "C")
		// 		this.issVeilor = Number(this.issVeilor) + Number(ojson.dados[i].issretido);
		// }

		if(this.issVeilor != 0)
		{
		 	this.issVeilor = this.issVeilor.toString();
			
	 		if(this.issVeilor.charAt(this.issVeilor.length-3) == '.')
		 		this.issVeilor = this.setCharAt(this.issVeilor, this.issVeilor.length-3, ',');
		 	else if(this.issVeilor.charAt(this.issVeilor.length-2) == '.')
		 		this.issVeilor = this.setCharAt(this.issVeilor, this.issVeilor.length-2, ',');
		}
		else
		{
			this.issVeilor = this.issVeilor+",00";
		}
	}

}
