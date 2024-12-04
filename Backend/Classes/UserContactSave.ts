import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class UserContactSave implements IJSONData{
    public userID:string;
    public savedUserId:string;
    public savedUserName:string;

    constructor(_savingUserId:string, _savedUserId:string, _savedUserName:string){
        this.userID = _savingUserId;
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

    public static fromFirebaseJson(data:{userID:string, savedUserId:string, savedUserName:string}):UserContactSave{
        return new UserContactSave(data.userID, data.savedUserId, data.savedUserName);
    }

}