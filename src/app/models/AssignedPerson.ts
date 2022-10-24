export class AssignedPerson  {

    personName : string | null = null;
    personImage : string | null = null;
    personMobile : string | null = null;

    constructor() {}

    public getPersonImage() : string | null{
        return this.personImage;
    }

    public getPersonMobile(): string | null {
        return this.personMobile;
    }

    public getPersonName(): string | null {
        return this.personName;
    }

    public setPersonName(personName : string | null) {
        this.personName = personName;
    }

    public setPersonMobile(personMobile: string | null) {
        this.personMobile = personMobile;
    }

    public setPersonImage(personImage : string | null) {
        this.personImage = personImage;
    }

  }