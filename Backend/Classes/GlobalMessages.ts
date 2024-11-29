import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GlobalMessages implements IDatabaseAdapter{
    messages:Message[];

    private static firebaseAdapter:any;

    constructor(){
        if(GlobalMessages.firebaseAdapter == null)
            GlobalMessages.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"GlobalMessage">("GlobalMessages");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return GlobalMessages.firebaseAdapter;
    }
}