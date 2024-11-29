import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter.ts";
import { Profile } from "./Profile.ts";

export class StudentProfile extends Profile implements IDatabaseAdapter{
    private resume:string | null;

    private static firebaseAdapter:any;

    constructor(_rollNumber:string, _profilePic: string | null, _bio:string, _resume: string | null){
        super(_rollNumber,_profilePic,_bio);
        this.resume = _resume;

        if(StudentProfile.firebaseAdapter == null)
            StudentProfile.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"Profile">("Profiles");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return StudentProfile.firebaseAdapter;
    }
}