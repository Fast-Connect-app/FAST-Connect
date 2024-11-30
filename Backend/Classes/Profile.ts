export class Profile{
    protected userId:string;
    protected userName:string;
    protected dateOfBirth:Date;
    protected gender: string;
    protected rollNumber : string;
    protected profilePic : string | null;
    protected bio : string;

    protected type:string;

    constructor(_userId:string, _userName:string, _dateOfBirth:Date, _gender:string, _rollNumber : string, _profilePic : string | null, _bio : string){
        this.userId = _userId;
        this.dateOfBirth = _dateOfBirth;
        this.userName = _userName;
        this.gender = _gender;
        this.rollNumber = _rollNumber;
        this.bio = _bio;
        this.profilePic = _profilePic;
    }
}
