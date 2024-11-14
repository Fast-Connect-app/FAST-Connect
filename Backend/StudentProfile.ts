import { Profile } from "./Profile.ts";

export class StudentProfile extends Profile{
    private resume:File | null;

    constructor(_rollNumber:string, _profilePic:ImageBitmap | null, _bio:string, _resume:File | null){
        super(_rollNumber,_profilePic,_bio);
        this.resume = _resume;
    }
}