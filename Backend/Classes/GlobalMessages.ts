import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GlobalMessages implements IDatabaseAdapter,IJSONData{
    messages:Message[];

    static GetDatabaseAdapter(){
        return GetDatabaseAdapter<"GlobalMessage">(FirebaseAdapterFactory,"GlobalMessage");
    }

    public GetJsonData(): string {
        const data = {
            Messages: this.messages.map(message => JSON.parse(message.GetJsonData()))
        }

        return JSON.stringify(data);
    }
}