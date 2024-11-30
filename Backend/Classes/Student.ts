import { User } from "./User.ts";
import { StudentProfile } from "./StudentProfile.ts";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory.ts";

export class Student extends User implements IDatabaseAdapter,IJSONData{
    private dateOfAdmission:Date;
    private profile:StudentProfile | undefined;

    constructor(_userId:string ,_name:string, _dateOfBirth:Date, _gender:string, _dateOfAdmission:Date){
        super(_userId, _name,_dateOfBirth,_gender);
        this.dateOfAdmission = _dateOfAdmission;
        
        this.profile = new StudentProfile(_userId,"", null, "", null);
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"User">(FirebaseAdapterFactory,"Users");
    }

    public GetJsonData(): string {
        const data = { ...this };

        if (data.profile)
            data.profile = undefined;

        return JSON.stringify(data);
    }
}