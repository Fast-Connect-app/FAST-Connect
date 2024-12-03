import { Message } from "./Message"
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class PostMessages implements IJSONData {
    public postID:string;
    public messages:Message[] = [];

    constructor(_postID:string, originalMessage?:Message){
        this.postID = _postID;

        if(originalMessage)
            this.messages.push(originalMessage);
    }

    public GetDatabaseAdapter() {
        return GetDatabaseAdapter<"PostMessage">(FirebaseAdapterFactory,"PostMessages");
    }

    public GetJsonData(): object {
        const data = {
            id: this.postID,
            Messages: this.messages.map(message => message.GetJsonData()) 
        }
        return data;
    }

}