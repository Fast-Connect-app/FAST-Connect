export class Profile{
    protected rollNumber : string;
    protected profilePic : string | null;
    protected bio : string;

    constructor(_rollNumber : string, _profilePic : string | null, _bio : string){
        this.rollNumber = _rollNumber;
        this.bio = _bio;
        this.profilePic = _profilePic;
    }
}
