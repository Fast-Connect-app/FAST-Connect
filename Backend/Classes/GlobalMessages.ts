import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GlobalMessages implements IJSONData{
    public messages:Message[];

    public static GetDatabaseAdapter(){
        return GetDatabaseAdapter<"GlobalMessage">(FirebaseAdapterFactory,"GlobalMessage");
    }

    public GetJsonData(): object {
        const data = {
            Messages: this.messages.map(message => message.GetJsonData())
        }

        return data;
    }
}