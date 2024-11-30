import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class DirectMessages implements IDatabaseAdapter{
    private userToUserId:string;
    private messages:Message[];

    constructor(_userToUserId:string, _message:Message){
        this.userToUserId = _userToUserId;
        this.messages.push(_message);
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"DirectMessage">(FirebaseAdapterFactory,"DirectMessages");
    }
}