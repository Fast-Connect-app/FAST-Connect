import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { Timestamp } from "firebase-admin/firestore";
export class Profile {
  protected userId: string;
  protected email: string;
  protected userName: string;
  protected dateOfBirth: Date;
  protected gender: string;
  protected rollNumber: string;
  protected profilePic: string | null;
  protected bio: string;
  protected type: string;

  constructor(_userId: string, _email: string, _userName: string, _dateOfBirth: Date, _gender: string, _rollNumber: string, _profilePic: string | null, _bio: string) {
    this.userId = _userId;
    this.email = _email;
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
  public GetEmail(): string {
    return this.email;
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

  public static fromFirebaseJson(data: { userId: string; email: string; userName: string; dateOfBirth: Timestamp; gender: string; rollNumber: string; profilePic: string | null; bio: string }): Profile {
    const newDate = new Date(data.dateOfBirth.seconds * 1000 + data.dateOfBirth.nanoseconds / 1000000);
    return new Profile(data.userId, data.email, data.userName, newDate, data.gender, data.rollNumber, data.profilePic, data.bio);
  }

  public SetUserName(userName: string): void {
    this.userName = userName;
  }

  public SetEmail(email: string): void {
    this.email = email;
  }

  public SetUserId(userId: string): void {
    this.userId = userId;
  }

  public SetDateOfBirth(dateOfBirth: Date): void {
    this.dateOfBirth = dateOfBirth;
  }

  public SetGender(gender: string): void {
    this.gender = gender;
  }

  public SetRollNumber(rollNumber: string): void {
    this.rollNumber = rollNumber;
  }

  public SetProfilePic(profilePic: string | null): void {
    this.profilePic = profilePic;
  }

  public SetBio(bio: string): void {
    this.bio = bio;
  }

  public SetType(type: string): void {
    this.type = type;
  }
}
