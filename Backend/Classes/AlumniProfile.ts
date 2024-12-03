import { IJSONData } from "./IDatabaseAdapter.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { Timestamp } from "firebase-admin/firestore";

export class Job {
  public jobTitle: string;
  public companyName: string;
  public startDate: Date;
  public endDate: Date;

  constructor(_jobTitle: string, _companyName: string, _startDate: Date, _endDate: Date) {
    this.jobTitle = _jobTitle;
    this.companyName = _companyName;
    this.startDate = _startDate;
    this.endDate = _endDate;
  }

  public static fromFirebaseJson(data: { jobTitle: string; companyName: string; startDate: Timestamp; endDate: Timestamp }): Job {
    const newstartDate = new Date(data.startDate.seconds * 1000 + data.startDate.nanoseconds / 1000000);
    const newendDate = new Date(data.endDate.seconds * 1000 + data.endDate.nanoseconds / 1000000);
    return new Job(data.jobTitle, data.companyName, newstartDate, newendDate);
  }

  public GetJsonData(): object {
    //Get all the data
    const data = { ...this };
    return data;
  }
}

export class AlumniProfile implements IJSONData {
  public jobHistory: Job[] | null;
  public dateOfGraduation: Date | null;

  constructor(_jobHistory: Job[] | null, _dateOfGraduation: Date | null) {
    this.jobHistory = _jobHistory;
    this.dateOfGraduation = _dateOfGraduation;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"Profile">(FirebaseAdapterFactory, "AlumniProfile");
  }
  public GetJsonData(): object {
    //Get all the data
    const data = {
      jobHistory: this.jobHistory ? this.jobHistory.map((job) => job.GetJsonData()) : null,
      dateOfGraduation: this.dateOfGraduation,
    };
    return data;
  }

  public static fromFirebaseJson(data: { userID: string; jobHistory: object[] | null; dateOfGraduation: Date | null }): AlumniProfile {
    return new AlumniProfile(data.jobHistory ? data.jobHistory.map((job) => Job.fromFirebaseJson(job)) : null, data.dateOfGraduation);
  }
}
