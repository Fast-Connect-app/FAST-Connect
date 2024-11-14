export class Profile{
    private rollNumber:string;
    private profilePic:ImageBitmap | null;
    private bio: string;

    constructor(_rollNumber:string, _profilePic:ImageBitmap | null, _bio:string){
        this.rollNumber = _rollNumber;
        this.bio = _bio;
        this.profilePic = _profilePic;
    }
}
