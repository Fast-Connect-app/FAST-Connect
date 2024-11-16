export class User{
    private name:string;
    private email:string;
    private password:string;
    private dateOfBirth:Date;
    private gender:string;

    constructor(_name:string, _email:string, _password:string, _dateOfBirth:Date, _gender:string){
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.dateOfBirth = _dateOfBirth;
        this.gender = _gender;
    }
}