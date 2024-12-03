import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class UserContactSave implements IJSONData{
    public savingUserId:string;
    public savedUserId:string;
    public savedUserName:string;

    constructor(_savingUserId:string, _savedUserId:string, _savedUserName:string){
        this.savingUserId = _savingUserId;
        this.savedUserId = _savedUserId;
        this.savedUserName = _savedUserName;
    }

    public static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"UserContactSave">(FirebaseAdapterFactory,"UserContactSaves");
    }

    public GetJsonData(): object {
        const data = {...this};
        return data;
    }
}