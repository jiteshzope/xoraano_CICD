import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppParametersService } from 'src/app/Services/app-parameters.service';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})
export class TermsOfUseComponent implements OnInit {

  heading  :string = '';
  content  :string = '';

  faArrowCircleRight = faArrowCircleRight;

  faArrowCircleLeft = faArrowCircleLeft;

  constructor(private appParamsService: AppParametersService,private router : Router) { }

  ngOnInit() {

    this.appParamsService.getAppParams().subscribe(params => {

      let terms = params.eula;

      this.heading = terms.split(":")[0];

      this.content  = terms.replace(this.heading+':' , "");


    });

  }

  goToPrivacyPolicy(){
    this.router.navigate(['/privacy-policy']);
  }

}
