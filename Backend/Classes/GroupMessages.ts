import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GroupMessages implements IDatabaseAdapter,IJSONData{
    private groupID:string;
    private messages: Message[];

    private static firebaseAdapter:any;

    constructor(_groupID:string){
        this.groupID = _groupID;
    }

    public GetDatabaseAdapter() {
        return GetDatabaseAdapter<"GroupMessage">(FirebaseAdapterFactory,"GroupMessages",this.groupID,"Messages");
    }

    public GetJsonData(): string {
        const data = {
            groupID: this.groupID,
            Messages: this.messages.map(message => JSON.parse(message.GetJsonData()))
        }

        return JSON.stringify(data);
    }
}