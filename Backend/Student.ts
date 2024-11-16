import { User } from "./User.ts";
import { StudentProfile } from "./StudentProfile.ts";

export class Student extends User{
    private dateOfAdmission:Date;
    private profile:StudentProfile;

    constructor(_name:string, _email:string, _password:string, _dateOfBirth:Date, _gender:string, _dateOfAdmission:Date){
        super(_name,_email,_password,_dateOfBirth,_gender);
        this.dateOfAdmission = _dateOfAdmission;
        
        this.profile = new StudentProfile("", null, "", null);
    }
}