import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav, AlertController} from 'ionic-angular';
import {StatusBar, SQLite} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {LoginLembrado} from './pages/login-lembrado/login-lembrado';

import { Storage, LocalStorage } from 'ionic-angular'

import {GlobalServices} from './pages/services/globalServices';

@Component({
  templateUrl: 'build/app.html',
  providers: [GlobalServices]
})
class MyApp 
{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  public db: SQLite;

  constructor(public platform: Platform, public menu: MenuController, public alertCtrl: AlertController)
  {
    this.initializeApp();
  }

  initializeApp() 
  {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      this.db = new SQLite();
      this.db.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.db.executeSql("CREATE TABLE IF NOT EXISTS people3 (id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, login TEXT)", {}).then((data) => {
        }, (error) => {alert("Impossivel executar sql " + error);})
            }, (error) => {alert("Impossivel abrir o banco " + error);});

      this.db.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.refresh();
        }, (error) => {
            alert("Erro: " + error);
        });
    });
  }

  public refresh() 
  {
        this.db.executeSql("SELECT * FROM people3", []).then((data) => {
            if(data.rows.length > 0) 
            {
                this.nav.setRoot(LoginLembrado);
            }
        }, (error) => {
            console.log("Erro: " + JSON.stringify(error));
        });
  }

}

ionicBootstrap(MyApp);
