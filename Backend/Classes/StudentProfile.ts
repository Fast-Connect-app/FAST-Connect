import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

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
    return data;
  }

  public static FromFirebaseJson(data: { resume: string | null; dateOfAdmission: Date | null }): StudentProfile {
    return new StudentProfile(data.resume, data.dateOfAdmission);
  }
}
