import { Message } from "./Message"
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter, IJSONData } from "./IDatabaseAdapter";

export class PostMessages implements IJSONData,IDatabaseAdapter {
    private postID:string;
    private messages:Message[] = [];

    constructor(_postID:string, originalMessage?:Message){
        this.postID = _postID;

        if(originalMessage)
            this.messages.push(originalMessage);
    }

    public GetDatabaseAdapter() {
        return GetDatabaseAdapter<"PostMessage">(FirebaseAdapterFactory,"PostMessages");
    }

    public GetJsonData(): string {
        const data = {
            id: this.postID,
            Messages: this.messages.map(message => JSON.parse(message.GetJsonData())) 
        }
        
        return JSON.stringify(data);
    }

}