export class User{
    protected name:string;
    protected email:string;
    protected password:string;
    protected dateOfBirth:Date;
    protected gender:string;

    constructor(_name:string, _email:string, _password:string, _dateOfBirth:Date, _gender:string){
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.dateOfBirth = _dateOfBirth;
        this.gender = _gender;
    }
}