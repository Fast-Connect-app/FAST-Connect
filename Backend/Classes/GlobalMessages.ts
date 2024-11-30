import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GlobalMessages implements IDatabaseAdapter{
    messages:Message[];

    static GetDatabaseAdapter(){
        return GetDatabaseAdapter<"GlobalMessage">(FirebaseAdapterFactory,"GlobalMessage");
    }
}