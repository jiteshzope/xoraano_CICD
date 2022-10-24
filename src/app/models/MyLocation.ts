
export class MyLocation {
    private latitude : number | null;
    private longitude : number | null;

    constructor(latitude : number | null, longitude : number | null){
        this.latitude=latitude;
        this.longitude=longitude;

    }

    public getLatitude() : number | null {
        return this.latitude;
    }

    public getLongitude()  : number | null{
        return this.longitude;
    }

    public setLatitude(latitude : number | null) {
        this.latitude = latitude;
    }

    public setLongitude(longitude : number | null) {
        this.longitude = longitude;
    }
}
