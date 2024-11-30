import { User } from "./User.ts";
import { AlumniProfile } from "./AlumniProfile.ts";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter.ts";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory.ts";

export class Alumni extends User implements IDatabaseAdapter, IJSONData{
    private dateOfGraduation:Date;
    private profile:AlumniProfile | undefined;

    constructor(_userId:string ,_name:string, _dateOfBirth:Date, _gender:string, _dateOfGraduation:Date){
        super(_userId,_name,_dateOfBirth,_gender);
        this.dateOfGraduation = _dateOfGraduation;
        this.profile = new AlumniProfile(_userId,"", null, "", "");
        this.type = "Alumni"
    }

    static GetDatabaseAdapter(){
        return GetDatabaseAdapter<"User">(FirebaseAdapterFactory,"Users");
    }

    public GetJsonData(): string {
        //Get all the data in the class
        const data = {...this};

        //exclude the profile from the data
        if(data.profile)
            data.profile = undefined;

        return JSON.stringify(data);
    }
}