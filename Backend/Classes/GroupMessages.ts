import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GroupMessages implements IDatabaseAdapter{
    private groupID:string;
    private messages: Message[];

    private static firebaseAdapter:any;

    constructor(_groupID:string){
        this.groupID = _groupID;

        if(GroupMessages.firebaseAdapter == null)
            GroupMessages.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"GroupMessage">("GroupMessages",this.groupID,"Messages");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return GroupMessages.firebaseAdapter;
    }
}