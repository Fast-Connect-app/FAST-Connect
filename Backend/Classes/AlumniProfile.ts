import { IJSONData } from "./IDatabaseAdapter.ts";
import { Profile } from "./Profile.ts";

export class AlumniProfile extends Profile implements IJSONData {
  public jobHistory: string | null;
  public dateOfGraduation: Date | null;

  constructor(_userId: string, _email: string, _userName: string, _dateOfBirth: Date, _gender: string, _rollNumber: string, _profilePic: string | null, _bio: string, _jobHistory: string | null, _dateOfGraduation: Date | null) {
    super(_userId, _email, _userName, _dateOfBirth, _gender, _rollNumber, _profilePic, _bio);
    this.jobHistory = _jobHistory;
    this.dateOfGraduation = _dateOfGraduation;
    this.type = "Alumni";
  }

  public GetJsonData(): object {
    //Get all the data
    const data = { ...this };
    return data;
  }
}
