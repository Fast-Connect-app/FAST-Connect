import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory.ts";
import { Profile } from "./Profile.ts";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory.ts";

export class AlumniProfile extends Profile implements IDatabaseAdapter, IJSONData{
    private jobHistory : string | null;

    constructor(_userId:string, _rollNumber:string, _profilePic : null, _bio :string, _jobHistory : string | null){
        super(_userId, _rollNumber, _profilePic, _bio);
        this.jobHistory = _jobHistory;
        this.type = "AlumniProfile";
    }

    static GetDatabaseAdapter(){
        return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory,"Profiles");
    }

    public GetJsonData(): string {
        //Get all the data
        const data = {...this};
        return JSON.stringify(data);
    }
}