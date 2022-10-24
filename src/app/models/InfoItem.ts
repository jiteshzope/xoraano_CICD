

export class InfoItem {
    private cred1 : string | null ='';
    private cred2 : string | null ='';

    constructor(cred1 : string | null,cred2 : string | null){
        this.cred1=cred1;
        this.cred2=cred2;
    }

    public getCred1() : string | null {
        return this.cred1;
    }

    public getCred2() : string | null{
        return this.cred2;
    }

    public setCred1(cred1 : string | null) {
        this.cred1 = cred1;
    }

    public setCred2(cred2 : string | null) {
        this.cred2 = cred2;
    }
}

