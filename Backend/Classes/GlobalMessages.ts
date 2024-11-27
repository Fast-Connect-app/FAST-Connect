import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { DatabaseAdapterFactory } from "../DatabaseFactory/DatabaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GlobalMessages implements IDatabaseAdapter{
    messages:Message[];

    private static firebaseAdapter:any;

    constructor(){
        if(GlobalMessages.firebaseAdapter == null)
            GlobalMessages.firebaseAdapter = DatabaseAdapterFactory.CreateAdapter<"GlobalMessage">("firebase","GlobalMessages");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return GlobalMessages.firebaseAdapter;
    }
}