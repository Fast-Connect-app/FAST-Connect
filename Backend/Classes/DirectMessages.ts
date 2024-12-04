import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class DirectMessages implements IJSONData{
    public userToUserId:string;
    public messages:Message[] = [];

    constructor(_userToUserId:string, _messages?:Message[]){
        this.userToUserId = _userToUserId;
        if(_messages)
            this.messages = _messages;
    }

    public GetDatabaseAdapter() {
        return GetDatabaseAdapter<"DirectMessage">(FirebaseAdapterFactory,"DirectMessages",this.userToUserID,"Messages");
    }

    public GetJsonData(): object {
        const data = {
            userToUserId: this.userToUserId,
            Messages: this.messages.map(message => message.GetJsonData())
        }
        return data;
    }
    public static fromFirebaseJson(data:{userToUserId:string, messages:object[]}):DirectMessages{
        const messages = data.messages.map(message => Message.fromFirebaseJson(message));
        return new DirectMessages(data.userToUserId, messages);
    }
}