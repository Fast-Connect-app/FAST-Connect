import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter.ts";
import { IDatabaseAdapter } from "./IDatabaseAdapter.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory.ts";
import { Profile } from "./Profile.ts";

export class AlumniProfile extends Profile implements IDatabaseAdapter{
    private jobHistory : string | null;


    private static firebaseAdapter:any;

    constructor(_rollNumber:string, _profilePic : null, _bio :string, _jobHistory : string | null){
        super(_rollNumber, _profilePic, _bio);
        
        this.jobHistory = _jobHistory;
    
        if(AlumniProfile.firebaseAdapter == null)
            AlumniProfile.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"Profile">("Profiles");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return AlumniProfile.firebaseAdapter;
    }
}