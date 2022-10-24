import { DisplayInfo } from './DisplayInfo';
import { Limit } from './Limit';
import { PincodeInfo } from './PincodeInfo';

export class CityParameters {
     pincodes: string[] = [] ;
     blocked_nos_list: string[] = [] ;

     city_pincode_map : {[key:string] : string} = {} ;
    
     pincodeToPincodeInfoMap : {[key:string] : PincodeInfo} = {} ;
     displayInfo : DisplayInfo = new DisplayInfo();
     limit : Limit  = new Limit();

    // UpdateParams updateParams; // only for android

    constructor(){

    }

    public setLimit(limit : Limit ) {
        this.limit = limit;
    }

    public getDisplayInfo() : DisplayInfo  {
        return this.displayInfo;
    }

    public getLimit():Limit  {
        return this.limit;
    }

    public setDisplayInfo( displayInfo : DisplayInfo ) {
        this.displayInfo = displayInfo;
    }

    public getPincodeToPincodeInfoMap() : {[key:string] : PincodeInfo }  {
        return this.pincodeToPincodeInfoMap;
    }

    public setPincodeToPincodeInfoMap(pincodeToPincodeInfoMap: {[key:string] : PincodeInfo} ) {
        this.pincodeToPincodeInfoMap = pincodeToPincodeInfoMap;
    }

    public getCity_pincode_map() : {[key:string] : string} {
        return this.city_pincode_map;
    }

    public setCity_pincode_map(city_pincode_map : {[key:string] : string} ) {
        this.city_pincode_map = city_pincode_map;
    }

    public getBlocked_nos_list() : string[]  {
        return this.blocked_nos_list;
    }

    public setBlocked_nos_list( blocked_nos_list: string[] ) {
        this.blocked_nos_list = blocked_nos_list;
    }


    public getPincodes() : string[]  {
        return this.pincodes;
    }

    public setPincodes(pincodes:string[] ) {
        this.pincodes = pincodes;
    }
}

