import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { DatabaseAdapterFactory } from "../DatabaseFactory/DatabaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class DirectMessages implements IDatabaseAdapter{
    private userToUserId:string;
    private messages:Message[];
    
    private static firebaseAdapter:any;

    constructor(_userToUserId:string){
        this.userToUserId = _userToUserId;

        if(DirectMessages.firebaseAdapter == null)
            DirectMessages.firebaseAdapter = DatabaseAdapterFactory.CreateAdapter<"DirectMessage">("firebase","DirectMessages",this.userToUserId,"Messages");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return DirectMessages.firebaseAdapter;
    }
}