import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";
import { User } from "./User";

export class UserContactSave implements IDatabaseAdapter{
    private savingUserId:string;
    private savedUserId:string;
    private savedUserName:string;

    constructor(_savingUserId:string, _savedUserId:string, _savedUserName:string){
        this.savingUserId = _savingUserId;
        this.savedUserId = _savedUserId;
        this.savedUserName = _savedUserName;
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"UserContactSave">(FirebaseAdapterFactory,"UserContactSaves");
    }
}