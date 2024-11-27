import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { DatabaseAdapterFactory } from "../DatabaseFactory/DatabaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class Post implements IDatabaseAdapter{
    private title:string;
    private postingUser:string;
    private content:string;

    private static firebaseAdpater:any;

    constructor(_title:string, _postingUser:string, _content:string){
        this.content = _content;
        this.postingUser = _postingUser;
        this.title = _title;

        if(Post.firebaseAdpater == null)
            Post.firebaseAdpater = DatabaseAdapterFactory.CreateAdapter<"Post">("firebase","Posts");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return Post.firebaseAdpater;
    }
}