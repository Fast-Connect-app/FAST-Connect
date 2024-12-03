import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class DirectMessages implements IJSONData{
    public userToUserId:string;
    public messages:Message[] = [];

    constructor(_userToUserId:string, _message:Message){
        this.userToUserId = _userToUserId;
        this.messages.push(_message);
    }

    public GetDatabaseAdapter() {
        return GetDatabaseAdapter<"DirectMessage">(FirebaseAdapterFactory,"DirectMessages",this.userToUserId,"Messages");
    }

    public GetJsonData(): object {
        const data = {
            userToUserId: this.userToUserId,
            Messages: this.messages.map(message => message.GetJsonData())
        }
        return data;
    }
}