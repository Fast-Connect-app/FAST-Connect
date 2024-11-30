import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter.ts";
import { Profile } from "./Profile.ts";

export class StudentProfile extends Profile implements IDatabaseAdapter,IJSONData{
    private resume:string | null;

    constructor(_userId:string ,_rollNumber:string, _profilePic: string | null, _bio:string, _resume: string | null){
        super(_userId, _rollNumber,_profilePic,_bio);
        this.resume = _resume;
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory,"Profiles");
    }

    public GetJsonData(): string {
        const data = {...this};
        return JSON.stringify(data);
    }
}