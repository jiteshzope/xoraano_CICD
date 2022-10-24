

export class DisplayFoodItem {

    private description : string | null = null;
    private image : string | null = null;
    private name : string | null = null;
    private videourl : string | null = null;

    constructor(){

    }

    public getVideourl(): string | null {
        return this.videourl;
    }

    public setVideourl(videourl : string | null) {
        this.videourl = videourl;
    }

    public setImage(image : string | null) {
        this.image = image;
    }

    public getImage(): string | null {
        return this.image;
    }

    public getDescription(): string | null {
        return this.description;
    }

    public setDescription(description : string | null) {
        this.description = description;
    }

    public setName(name : string | null) {
        this.name = name;
    }

    public getName(): string | null {
        return this.name;
    }
}
