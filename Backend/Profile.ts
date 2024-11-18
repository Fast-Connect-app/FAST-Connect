export class Profile{
    protected rollNumber : string;
    protected profilePic : File | null;
    protected bio : string;

    constructor(_rollNumber : string, _profilePic : File | null, _bio : string){
        this.rollNumber = _rollNumber;
        this.bio = _bio;
        this.profilePic = _profilePic;
    }
}
