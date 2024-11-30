import { IDatabaseAdapter } from "./IDatabaseAdapter.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory.ts";
import { Profile } from "./Profile.ts";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory.ts";

export class AlumniProfile extends Profile implements IDatabaseAdapter{
    private jobHistory : string | null;

    private static firebaseAdapter;

    constructor(_rollNumber:string, _profilePic : null, _bio :string, _jobHistory : string | null){
        super(_rollNumber, _profilePic, _bio);
        
        this.jobHistory = _jobHistory;
    }

    static GetDatabaseAdapter(){
        return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory,"Profiles");
    }
}