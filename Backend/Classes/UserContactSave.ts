import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter, IJSONData } from "./IDatabaseAdapter";

export class UserContactSave implements IDatabaseAdapter,IJSONData{
    private savingUserId:string;
    private savedUserId:string;
    private savedUserName:string;

    constructor(_savingUserId:string, _savedUserId:string, _savedUserName:string){
        this.savingUserId = _savingUserId;
        this.savedUserId = _savedUserId;
        this.savedUserName = _savedUserName;
    }

    public GetDatabaseAdapter() {
        return GetDatabaseAdapter<"UserContactSave">(FirebaseAdapterFactory,"UserContactSaves");
    }

    public GetJsonData(): object {
        const data = {...this};
        return data;
    }
}