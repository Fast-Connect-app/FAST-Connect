import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter.ts";
import { Profile } from "./Profile.ts";

export class StudentProfile extends Profile implements IDatabaseAdapter{
    private resume:string | null;

    constructor(_rollNumber:string, _profilePic: string | null, _bio:string, _resume: string | null){
        super(_rollNumber,_profilePic,_bio);
        this.resume = _resume;
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory,"Profiles");
    }
}