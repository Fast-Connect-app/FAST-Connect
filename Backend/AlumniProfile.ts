import { Profile } from "./Profile.ts";

export class AlumniProfile extends Profile{
    private jobHistory: File | string | null;

    constructor(_rollNumber:string, _profilePic:ImageBitmap | null, _bio:string, _jobHistory: File | string | null){
        super(_rollNumber, _profilePic, _bio);

        this.jobHistory = _jobHistory;
    }
}