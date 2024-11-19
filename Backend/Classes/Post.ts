export class Post{
    private title:string;
    private postingUser:string;
    private content:string;

    constructor(_title:string, _postingUser:string, _content:string){
        this.content = _content;
        this.postingUser = _postingUser;
        this.title = _title;
    }
}