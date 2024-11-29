import { User } from "./User.ts";
import { AlumniProfile } from "./AlumniProfile.ts";
import { IDatabaseAdapter } from "./IDatabaseAdapter.ts";
import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter.ts";
import { BaseDatabaseAdapterFactory } from "../DatabaseFactory/DatabaseAdapterFactory.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory.ts";
export class Alumni extends User implements IDatabaseAdapter{
    private dateOfGraduation:Date;
    private profile:AlumniProfile;

    private static firebaseAdapter:any;
    
    constructor(_name:string, _email:string, _password:string, _dateOfBirth:Date, _gender:string, _dateOfGraduation:Date){
        super(_name,_email,_password,_dateOfBirth,_gender);
        this.dateOfGraduation = _dateOfGraduation;
        this.profile = new AlumniProfile("", null, "", "");

        if(Alumni.firebaseAdapter == null)
            Alumni.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"User">("Users");
    }



    GetDatabaseAdapter():BaseDatabaseAdapter{
        return Alumni.firebaseAdapter;
    }
}