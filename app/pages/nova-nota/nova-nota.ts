import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import {IssServices} from '../services/issServices';

import { GlobalServices } from '../services/globalServices';

@Component({
  templateUrl: 'build/pages/nova-nota/nova-nota.html',
  providers: [IssServices]
})

export class NovaNota 
{
	infoUsuario: string;
	arrayServicos: any;
	valorServico: any;
	arrayCheckboxes: any;
    municipio: any;

    dadosTomador: any;

    login: string;
    senha: string;

	constructor(private navCtrl: NavController, private navParams: NavParams, private issServices: IssServices, public globalServices: GlobalServices, public alertCtrl: AlertController) 
    {
        issServices.globalServices = globalServices;
		this.infoUsuario = this.navParams.get('param1');
        this.login = this.navParams.get('param2');
        this.senha = this.navParams.get('param3');
        this.municipio = this.navParams.get('param4');

		this.arrayServicos = JSON.parse(this.infoUsuario);
		this.arrayCheckboxes = ["N","N","N","N","N"];
	}

    onPageLoaded()
    {

        (<HTMLInputElement>document.getElementById("aliquotaIrrf")).value = JSON.parse(this.infoUsuario).dados[0].aliqirrf;
        (<HTMLInputElement>document.getElementById("aliquotaInss")).value = JSON.parse(this.infoUsuario).dados[0].aliqinss;
        (<HTMLInputElement>document.getElementById("aliquotaPis")).value = JSON.parse(this.infoUsuario).dados[0].aliqpis;
        (<HTMLInputElement>document.getElementById("aliquotaCofins")).value = JSON.parse(this.infoUsuario).dados[0].aliqcofins;
        (<HTMLInputElement>document.getElementById("aliquotaCsll")).value = JSON.parse(this.infoUsuario).dados[0].aliqcsll;        
    }

	criarNota()
	{
		var notaString;
		var infoUsuJson = JSON.parse(this.infoUsuario);
        var arrayRPS = [];
        var stringRPS = "99";
        var dataHoje = new Date();
        var i;

        var fixaDeducoes;

        if((<HTMLInputElement>document.getElementById("valDeduc")).value == "" || (<HTMLInputElement>document.getElementById("valDeduc")).value == null)
            fixaDeducoes = 0;
        else
            fixaDeducoes = (<HTMLInputElement>document.getElementById("valDeduc")).value;

        for(i = 0; i < 5; i++)
        {
            arrayRPS[i] = Math.floor((Math.random() * 10));    
        }

        console.log(arrayRPS);

        for(i = 0; i < 5; i++)
        {
            stringRPS = ""+stringRPS+""+arrayRPS[i];
        }

        console.log(dataHoje.getFullYear());
        console.log(dataHoje.getMonth()+1);
        console.log(dataHoje.getDate());

		notaString = "<?xml version='1.0' encoding='UTF-8'?>"+
                "<importacao>"+
                    "<nota>"+
                        "<rps_numero>"+stringRPS+"</rps_numero>"+
                        "<rps_data>"+dataHoje.getFullYear()+"-"+(dataHoje.getMonth()+1)+"-"+dataHoje.getDate()+"</rps_data>"+
                        "<tomador_nome>"+(<HTMLInputElement>document.getElementById("cliente")).value+"</tomador_nome>"+

                        "<tomador_cnpjcpf>"+(<HTMLInputElement>document.getElementById("cpfCnpj")).value+"</tomador_cnpjcpf>"+
                        
                        "<tomador_inscrmunicipal>I</tomador_inscrmunicipal>"+
                        
                        "<tomador_logradouro>"+(<HTMLInputElement>document.getElementById("endereco")).value+"</tomador_logradouro>"+
                        
                        "<tomador_numero>"+(<HTMLInputElement>document.getElementById("numero")).value+"</tomador_numero>"+
                        
                        "<tomador_complemento>"+(<HTMLInputElement>document.getElementById("complemento")).value+"</tomador_complemento>"+
                        
                        "<tomador_bairro>"+(<HTMLInputElement>document.getElementById("bairro")).value+"</tomador_bairro>"+
                        
                        "<tomador_cep>"+(<HTMLInputElement>document.getElementById("cep")).value+"</tomador_cep>"+
                        
                        "<tomador_municipio>"+(<HTMLInputElement>document.getElementById("municipio")).value+"</tomador_municipio>"+
                        
                        "<tomador_uf>"+(<HTMLInputElement>document.getElementById("uf")).value+"</tomador_uf>"+
                        
                        "<tomador_email>"+(<HTMLInputElement>document.getElementById("email")).value+"</tomador_email>"+
                        
                        "<discriminacao>"+(<HTMLInputElement>document.getElementById("discriminacao")).value+"</discriminacao>"+
                        
                        "<observacao>"+(<HTMLInputElement>document.getElementById("obsNota")).value+"</observacao>"+
                        
                        "<aliqinss>"+(<HTMLInputElement>document.getElementById("aliquotaInss")).value+"</aliqinss>"+

                        "<reteminss>"+this.arrayCheckboxes[0]+"</reteminss>"+
                        
                        "<aliqirrf>"+(<HTMLInputElement>document.getElementById("aliquotaIrrf")).value+")</aliqirrf>"+

                        "<retemirrf>"+this.arrayCheckboxes[1]+"</retemirrf>"+
                        
                        "<deducaoirrf>"+(<HTMLInputElement>document.getElementById("deducaoIrrf")).value+"</deducaoirrf>"+
                        
                        "<aliqpis>"+(<HTMLInputElement>document.getElementById("aliquotaPis")).value+")</aliqpis>"+

                        "<retempis>"+this.arrayCheckboxes[2]+"</retempis>"+
                        
                        "<aliqcofins>"+(<HTMLInputElement>document.getElementById("aliquotaCofins")).value+"</aliqcofins>"+
                        
						"<retemcofins>"+this.arrayCheckboxes[3]+"</retemcofins>"+
                        
                        "<aliqcsll>"+(<HTMLInputElement>document.getElementById("aliquotaCsll")).value+"</aliqcsll>"+
                    	
						"<retemcsll>"+this.arrayCheckboxes[4]+"</retemcsll>"+
                        
                        "<valordeducoes>"+fixaDeducoes+"</valordeducoes>"+
                        
                        "<estado>Normal</estado>"+
                        
                        "<codservico>"+
                            "<codservico>"+this.valorServico+"</codservico>"+
                            "<basecalculo>"+(<HTMLInputElement>document.getElementById("baseCalculo")).value+"</basecalculo>"+
                            "<issretido>"+(<HTMLInputElement>document.getElementById("issRetido")).value+"</issretido>"+
                        "</codservico>"+
                    "</nota>"+
                "</importacao>";

        this.issServices.requisicaoPOSTCriaNota(notaString, this.login, this.senha);

        var resultJson = document.getElementById("demoCrianota").textContent || document.getElementById("demoCrianota").innerText || "";

        document.getElementById("demoCrianota").innerHTML = resultJson;

        var jsonResposta =  JSON.parse(resultJson);

        console.log(jsonResposta);

        if(jsonResposta.status == 1)
        {
            //alert(jsonResposta.status_msg);
            this.showAlert('', jsonResposta.status_msg);
        }
        else if(jsonResposta.status == 0)
        {
            //alert("Nota Criada! N.: " +jsonResposta.dados[0].numero);
            this.showAlert('', "Nota Criada! N.: "+jsonResposta.dados[0].numero);
            this.navCtrl.pop();
        }
	}

    busqueTomador()
    {
        var dadoTomador = (<HTMLInputElement>document.getElementById('cpfCnpj')).value;

        this.issServices.requisicaoPOSTBuscaTomador(dadoTomador, this.login, this.senha);

        var resultJson = document.getElementById("demobuscatomador").textContent || document.getElementById("demobuscatomador").innerText || "";

        document.getElementById("demobuscatomador").innerHTML = resultJson;

        var jsonResposta =  JSON.parse(resultJson);

        (<HTMLInputElement>document.getElementById('bairro')).value = decodeURIComponent(this.utf8Decode(jsonResposta.dados[0].bairro));
        (<HTMLInputElement>document.getElementById('cep')).value = jsonResposta.dados[0].cep;
        (<HTMLInputElement>document.getElementById('complemento')).value = jsonResposta.dados[0].complemento;
        (<HTMLInputElement>document.getElementById('endereco')).value = decodeURIComponent(this.utf8Decode(jsonResposta.dados[0].logradouro));
        (<HTMLInputElement>document.getElementById('municipio')).value = decodeURIComponent(this.utf8Decode(jsonResposta.dados[0].municipio));
        (<HTMLInputElement>document.getElementById('numero')).value = jsonResposta.dados[0].numero;
        (<HTMLInputElement>document.getElementById('cliente')).value = decodeURIComponent(this.utf8Decode(jsonResposta.dados[0].razaosocial));
        (<HTMLInputElement>document.getElementById('uf')).value = jsonResposta.dados[0].uf;
        (<HTMLInputElement>document.getElementById('email')).value = jsonResposta.dados[0].email;

        console.log(jsonResposta);

        
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

    mascaraCEP()
    {
        (<any>$("#cep")).mask("?99999-999");
    }

    foqueiIn()
    {
        (<any>$("#cpfCnpj")).unmask();
    }

    foqueiOut()
    {
        if($("#cpfCnpj").val().replace(/[^\d]+/g,'').length <= 11)
        {
            (<any>$("#cpfCnpj")).mask("?999.999.999-99");
        } 
        if($("#cpfCnpj").val().replace(/[^\d]+/g,'').length > 11)
        {
            (<any>$("#cpfCnpj")).mask("?99.999.999/9999-99");
        }

        this.busqueTomador();
    }

    mascaraCPFCNPJ()
    {   
        if($("#cpfCnpj").val().replace(/[^\d]+/g,'').length < 11)
        {
            (<any>$("#cpfCnpj")).mask("?999.999.999-99");
        } 
        else if($("#cpfCnpj").val().replace(/[^\d]+/g,'').length >= 11)
        {
            (<any>$("#cpfCnpj")).mask("?99.999.999/9999-99");
        }                   
    }

	persisteSelect(valor)
	{
		this.valorServico = valor;
        (<HTMLInputElement>document.getElementById("codigoServico")).value = valor;
	}

	mudaCheckbox(evento, index)
	{
		if(evento.checked == true)
			this.arrayCheckboxes[index] = "S";
		else
			this.arrayCheckboxes[index] = "N";
	}

    consultaComCEP()
    {
        //Nova variável "cep" somente com dígitos.
        var cep = $("#cep").val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "")
        {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep))
            {
                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco").val("...");
                $("#bairro").val("...");
                $("#municipio").val("...");
                $("#uf").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("http://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) 
                {
                    if (!("erro" in dados)) 
                    {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#municipio").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    } //end if.
                    else 
                    {
                        //CEP pesquisado não foi encontrado.
                        $("#endereco").val("");
                        $("#bairro").val("");
                        $("#municipio").val("");
                        $("#uf").val("");
                        //alert("CEP não encontrado.");
                        this.showAlert('', 'CEP não encontrado.');

                    }
                });
            } //end if.
            else 
            {
                //cep é inválido.
                $("#endereco").val("");
                $("#bairro").val("");
                $("#municipio").val("");
                $("#uf").val("");
                //alert("Formato de CEP inválido.");
                this.showAlert('', 'Formato de CEP inválido.');
            }
        } //end if.
        else
        {
            //cep sem valor, limpa formulário.
            $("#endereco").val("");
            $("#bairro").val("");
            $("#municipio").val("");
            $("#uf").val("");
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
