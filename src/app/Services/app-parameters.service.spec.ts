import { TestBed, waitForAsync } from "@angular/core/testing";
import { AngularFireDatabase } from "@angular/fire/database";
import { of } from "rxjs";
import { AppParametersService } from "./app-parameters.service";

describe("AppParametersService",()=>{

    let dbSpy : any;
    let appParamsService : AppParametersService;

    beforeEach(waitForAsync(()=>{
        dbSpy = jasmine.createSpyObj("AngularFireDatabase",["object"]);

        TestBed.configureTestingModule({
            providers : [
                {provide : AngularFireDatabase, useValue : dbSpy},
                {provide : AppParametersService, useClass : AppParametersService}
            ]
        })
        appParamsService = TestBed.inject(AppParametersService);
    }));

    fit('getAppParams : should return appParams',()=>{


        dbSpy.object.and.returnValue({valueChanges : ()=>{
            return of({alertMsg : "This is an alert msg"});
        }});

        appParamsService.getAppParams().subscribe(params=>{
            expect(params).toBeTruthy();
            expect(params.alertMsg).toBe('This is an alert msg')
        },
        err=>{
            fail("appParams is falsy");
        });
    })

});