import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Language } from "../../providers/language";

@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html',
})
export class PolicyPage {
  appTitle: string = "Post Edit";
  text = {
    policyTitle1: 'policyTitle1',
    policyTitle2: 'policyTitle2',
    policyTitle3: 'policyTitle3',
    policyTitle4: 'policyTitle4',
    policyTitle5: 'policyTitle5',
    policyTitle6: 'policyTitle6',
    policyTitle7: 'policyTitle7',
    policyDescription1: 'policyDescription1',
    policyDescription2: 'policyDescription2',
    policyDescription3: 'policyDescription3',
    policyDescription4: 'policyDescription4',
    policyDescription5: 'policyDescription5',
    policyDescription6: 'policyDescription6',
    policyDescription7: 'policyDescription7',
  }

  constructor(private navCtrl: NavController,
              private language: Language,
  ) {

    this.appTitle = language.get('titlePolicy');
    this.text.policyTitle1 = language.get('policyTitle1');
    this.text.policyTitle2 = language.get('policyTitle2');
    this.text.policyTitle3 = language.get('policyTitle3');
    this.text.policyTitle4 = language.get('policyTitle4');
    this.text.policyTitle5 = language.get('policyTitle5');
    this.text.policyTitle6 = language.get('policyTitle6');
    this.text.policyTitle7 = language.get('policyTitle7');
    this.text.policyDescription1 = language.get('policyDescription1');
    this.text.policyDescription2 = language.get('policyDescription2');
    this.text.policyDescription3 = language.get('policyDescription3');
    this.text.policyDescription4 = language.get('policyDescription4');
    this.text.policyDescription5 = language.get('policyDescription5');
    this.text.policyDescription6 = language.get('policyDescription6');
    this.text.policyDescription7 = language.get('policyDescription7');
  }

}
