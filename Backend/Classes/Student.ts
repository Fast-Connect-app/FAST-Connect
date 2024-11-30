import { User } from "./User.ts";
import { StudentProfile } from "./StudentProfile.ts";
import { IDatabaseAdapter } from "./IDatabaseAdapter.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory.ts";

export class Student extends User implements IDatabaseAdapter{
    private dateOfAdmission:Date;
    private profile:StudentProfile;

    constructor(_name:string, _email:string, _password:string, _dateOfBirth:Date, _gender:string, _dateOfAdmission:Date){
        super(_name,_email,_password,_dateOfBirth,_gender);
        this.dateOfAdmission = _dateOfAdmission;
        
        this.profile = new StudentProfile("", null, "", null);
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"User">(FirebaseAdapterFactory,"Users");
    }
}