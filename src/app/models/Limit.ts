

export class Limit {
    private limitUsers : number|null = null;

    constructor() {

    }

    public getLimitUsers() : number|null {
        return this.limitUsers;
    }

    public setLimitUsers(limitUsers: number|null) {
        this.limitUsers = limitUsers;
    }
}



