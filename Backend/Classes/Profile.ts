export class Profile{
    protected userId:string;
    protected rollNumber : string;
    protected profilePic : string | null;
    protected bio : string;

    protected type:string;

    constructor(_userId:string,_rollNumber : string, _profilePic : string | null, _bio : string){
        this.userId = _userId;
        this.rollNumber = _rollNumber;
        this.bio = _bio;
        this.profilePic = _profilePic;
    }
}
