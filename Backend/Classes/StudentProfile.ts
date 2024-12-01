import { Profile } from "./Profile";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";

export class StudentProfile extends Profile implements IDatabaseAdapter,IJSONData{
    private resume:string | null;
    private dateOfAdmission:Date | null;

    constructor(_userId:string, _userName:string, _dateOfBirth:Date, _gender:string, _rollNumber : string, _profilePic : string | null, _bio : string, _resume:string | null, _dateOfAdmission:Date | null){
        super(_userId,_userName,_dateOfBirth,_gender,_rollNumber,_profilePic,_bio);
        this.resume = _resume;
        this.dateOfAdmission = _dateOfAdmission;
        this.type = "Student";
    }

    public GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory,"Profiles");
    }

    public GetJsonData(): string {
        const data = {...this};

        return JSON.stringify(data);
    }
}