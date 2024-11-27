import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { DatabaseAdapterFactory } from "../DatabaseFactory/DatabaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GroupMessages implements IDatabaseAdapter{
    private groupID:string;
    private messages: Message[];

    private static firebaseAdapter:any;

    constructor(_groupID:string){
        this.groupID = _groupID;

        if(GroupMessages.firebaseAdapter == null)
            GroupMessages.firebaseAdapter = DatabaseAdapterFactory.CreateAdapter<"GroupMessage">("firebase","GroupMessages",this.groupID,"Messages");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return GroupMessages.firebaseAdapter;
    }
}