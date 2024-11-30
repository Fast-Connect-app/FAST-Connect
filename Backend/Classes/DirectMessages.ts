import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class DirectMessages implements IDatabaseAdapter,IJSONData{
    private userToUserId:string;
    private messages:Message[] = [];

    constructor(_userToUserId:string, _message:Message){
        this.userToUserId = _userToUserId;
        this.messages.push(_message);
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"DirectMessage">(FirebaseAdapterFactory,"DirectMessages");
    }

    public GetJsonData(): string {
        const data = {
            userToUserId: this.userToUserId,
            Messages: this.messages.map(message => JSON.parse(message.GetJsonData()))
        }

        return JSON.stringify(data);
    }
}