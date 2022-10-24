import { Component, OnInit } from '@angular/core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { AppParametersService } from 'src/app/Services/app-parameters.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  heading  :string = '';
  content  :string = '';

  faArrowCircleLeft = faArrowCircleLeft;

  constructor(private appParamsService: AppParametersService) { }

  ngOnInit() {

    this.appParamsService.getAppParams().subscribe(params => {

      let policy = params.privacy_policy;

      this.heading = policy.split(":")[0];

      this.content  = policy.replace(this.heading+':' , "");


    });

  }

}
