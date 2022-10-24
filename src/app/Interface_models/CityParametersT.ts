import { DisplayInfoT } from './DisplayInfoT';
import { LimitT } from './LimitT';
import { PincodeInfoT } from './PincodeInfoT';

export interface CityParametersT {
     pincodes: string[] ;
     blocked_nos_list: string[] ;

     city_pincode_map : {[key:string] : string} ;
    
     pincodeToPincodeInfoMap : {[key:string] : PincodeInfoT};
     displayInfo : DisplayInfoT ;
     limit : LimitT;
    
}

