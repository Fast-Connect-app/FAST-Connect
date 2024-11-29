import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { User } from "./User";

export class UserContactSave implements IDatabaseAdapter{
    private savingUserId:string;
    private savedUserId:string;
    private savedUserName:string;

    private static firebaseAdapter:any;

    constructor(_savingUserId:string, _savedUserId:string, _savedUserName:string){
        this.savingUserId = _savingUserId;
        this.savedUserId = _savedUserId;
        this.savedUserName = _savedUserName;

        if(UserContactSave.firebaseAdapter == null)
            UserContactSave.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"UserSaveContact">("UserSaveContacts");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return UserContactSave.firebaseAdapter;
    }
}