import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class Post implements IDatabaseAdapter{
    private title:string;
    private postingUser:string;
    private content:string;

    constructor(_title:string, _postingUser:string, _content:string){
        this.content = _content;
        this.postingUser = _postingUser;
        this.title = _title;
    }

    static GetDatabaseAdapter(){
        return GetDatabaseAdapter<"Post">(FirebaseAdapterFactory,"Posts");
    }
}