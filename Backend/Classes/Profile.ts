import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
export class Profile {
  protected userId: string;
  protected userName: string;
  protected dateOfBirth: Date;
  protected gender: string;
  protected rollNumber: string;
  protected profilePic: string | null;
  protected bio: string;
  protected type: string;

  constructor(_userId: string, _userName: string, _dateOfBirth: Date, _gender: string, _rollNumber: string, _profilePic: string | null, _bio: string) {
    this.userId = _userId;
    this.dateOfBirth = _dateOfBirth;
    this.userName = _userName;
    this.gender = _gender;
    this.rollNumber = _rollNumber;
    this.bio = _bio;
    this.profilePic = _profilePic;
    this.type = "";
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory, "Profile");
  }
  public GetUserName(): string {
    return this.userName;
  }
  public GetUserId(): string {
    return this.userId;
  }
  public GetDateOfBirth(): Date {
    return this.dateOfBirth;
  }
  public GetGender(): string {
    return this.gender;
  }
  public GetRollNumber(): string {
    return this.rollNumber;
  }
  public GetProfilePic(): string | null {
    return this.profilePic;
  }
  public GetBio(): string {
    return this.bio;
  }

  public GetJsonString(): string {
    const data = { ...this };

    return JSON.stringify(data);
  }

  public GetJsonData(): object {
    const data = { ...this };
    return data;
  }

  public static fromJson(data: { userId: string; userName: string; dateOfBirth: string | number | Date; gender: string; rollNumber: string; profilePic: string | null; bio: string }): Profile {
    return new Profile(data.userId, data.userName, new Date(data.dateOfBirth), data.gender, data.rollNumber, data.profilePic, data.bio);
  }
}
