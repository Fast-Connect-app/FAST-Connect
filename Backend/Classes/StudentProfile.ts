import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";
import { Timestamp } from "firebase-admin/firestore";

export class StudentProfile implements IJSONData {
  public resume: string | null;
  public dateOfAdmission: Date | null;

  constructor(_resume: string | null, _dateOfAdmission: Date | null) {
    this.resume = _resume;
    this.dateOfAdmission = _dateOfAdmission;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory, "StudentProfile");
  }

  public GetJsonData(): object {
    //Get all the data
    const data = { ...this };
    data.resume = JSON.stringify(this.resume);
    return data;
  }

  public static FromFirebaseJson(data: { resume: string | null; dateOfAdmission: Timestamp }): StudentProfile {
    const newDate = new Date(data.dateOfAdmission.seconds * 1000 + data.dateOfAdmission.nanoseconds / 1000000);
    const newResume: string = data.resume ? JSON.parse(data.resume) : "";
    return new StudentProfile(newResume, newDate);
  }
}
