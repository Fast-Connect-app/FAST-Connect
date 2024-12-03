import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GlobalMessages implements IDatabaseAdapter,IJSONData{
    messages:Message[];

    public GetDatabaseAdapter(){
        return GetDatabaseAdapter<"GlobalMessage">(FirebaseAdapterFactory,"GlobalMessage");
    }

    public GetJsonData(): object {
        const data = {
            Messages: this.messages.map(message => message.GetJsonData())
        }

        return data;
    }
}