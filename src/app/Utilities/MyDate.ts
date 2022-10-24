
export class MyDate {

    private day: string;
    private date: string;
    private month: string;
    private year: string;
    private hours: string;
    private minutes: string;
    private am_pm: string;
    private seconds: string;
    private timestamp: string;

    constructor() {

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const d = new Date();
        this.day = days[d.getDay()].substr(0, 3); // Wed
        this.date = d.getDate().toString();  // 16 or 07
        this.month = months[d.getMonth()].substr(0, 3); // Sep
        this.year = d.getFullYear().toString(); // 2020

        let hours = d.getHours() > 12 ? d.getHours() - 12 : (d.getHours() === 0 ? 12 :
            (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()));
        hours = +hours < 10 ? '0' + (hours) : hours;  // 06 or 12
        this.hours = hours.toString();

        this.am_pm = d.getHours() > 11 ? 'PM' : 'AM';  // PM
        this.minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes().toString();  // 03 or 58

        this.seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds().toString();  // 03 or 58

        this.timestamp = d.getTime().toString(); // 1594016296769 



    }

    generateCurrentDayDateTime() {

        // 'Wed, 16 Sep 2020 06.03 PM'
        return this.day + ', ' + this.date + ' ' + this.month + ' ' + this.year + ' ' + this.hours + '.' + this.minutes +
            ' ' + this.am_pm;

    }


    getDate() {
        //2020-07-06
        return this.year+'-'+this.month+'-'+this.date;
    }

    getDateTime() {
        // 2020/07/06 11:48:16
        return this.year+'/'+this.month+'/'+this.date+' '+this.hours+':'+this.minutes+':'+this.seconds;
    }

    getDayDate() {
        // Mon, 6 Jul 2020
        return this.day + ', ' + this.date + ' ' + this.month + ' ' + this.year;
    }

    getTime() {
        // 11.48 AM
        return this.hours + '.' + this.minutes + ' ' + this.am_pm;
    }

    getTimeStamp() {
        // 1594016296769
        return this.timestamp;
    }


}