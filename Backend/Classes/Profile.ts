import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { Timestamp } from "firebase-admin/firestore";
export class Profile {
  public userId: string;
  public email: string;
  public userName: string;
  public dateOfBirth: Date;
  public gender: string;
  public rollNumber: string;
  public profilePic: string | null;
  public bio: string;
  public type: string;

  constructor(_userId: string, _email: string, _userName: string, _dateOfBirth: Date, _gender: string, _rollNumber: string, _profilePic: string | null, _bio: string, _type: string) {
    this.userId = _userId;
    this.email = _email;
    this.dateOfBirth = _dateOfBirth;
    this.userName = _userName;
    this.gender = _gender;
    this.rollNumber = _rollNumber;
    this.bio = _bio;
    this.profilePic = _profilePic;
    this.type = _type;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory, "Profile");
  }

  public GetJsonData(): object {
    const data = { ...this };
    return data;
  }

  public static fromFirebaseJson(data: { userId: string; email: string; userName: string; dateOfBirth: Timestamp; gender: string; rollNumber: string; profilePic: string | null; bio: string; type: string }): Profile {
    const newDate = new Date(data.dateOfBirth.seconds * 1000 + data.dateOfBirth.nanoseconds / 1000000);
    return new Profile(data.userId, data.email, data.userName, newDate, data.gender, data.rollNumber, data.profilePic, data.bio, data.type);
  }
}
