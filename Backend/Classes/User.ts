export class User{
    protected userId:string;
    protected name:string;
    protected dateOfBirth:Date;
    protected gender:string;

    protected type:string;

    constructor(_userId:string ,_name:string, _dateOfBirth:Date, _gender:string){
        this.userId = _userId;
        this.name = _name;
        this.dateOfBirth = _dateOfBirth;
        this.gender = _gender;
    }
}