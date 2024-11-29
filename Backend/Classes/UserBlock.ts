import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class UserBlock implements IDatabaseAdapter{
    private blockingUserId:string;
    private blockedUserId:string;
    private isBlocked:boolean;

    private static firebaseAdapter:any;

    constructor(_blockingUserId:string, _blockedUserId:string, _isBlocked:boolean){
        this.blockingUserId = _blockingUserId;
        this.blockedUserId = _blockedUserId;
        this.isBlocked = _isBlocked;

        if(UserBlock.firebaseAdapter == null)
            UserBlock.firebaseAdapter= FirebaseAdapterFactory.CreateAdapter<"UserBlock">("UserBlocks");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return UserBlock.firebaseAdapter;
    }
}