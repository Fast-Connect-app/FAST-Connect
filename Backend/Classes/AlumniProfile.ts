import { IJSONData } from "./IDatabaseAdapter.ts";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
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

  public static fromFirebaseJson(data: { jobTitle: string; companyName: string; startDate: Date; endDate: Date }): Job {
    return new Job(data.jobTitle, data.companyName, data.startDate, data.endDate);
  }

  public GetJsonData(): object {
    //Get all the data
    const data = { ...this };
    return data;
  }
}

export class AlumniProfile implements IJSONData {
  public userID: string;
  public jobHistory: Job[] | null;
  public dateOfGraduation: Date | null;

  constructor(_jobHistory: Job[] | null, _dateOfGraduation: Date | null) {
    this.jobHistory = _jobHistory;
    this.dateOfGraduation = _dateOfGraduation;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"AlumniProfile">(FirebaseAdapterFactory, "AlumniProfile");
  }
  public GetJsonData(): object {
    //Get all the data
    const data = {
      userID: this.userID,
      jobHistory: this.jobHistory ? this.jobHistory.map((job) => job.GetJsonData()) : null,
      dateOfGraduation: this.dateOfGraduation,
    };
    return data;
  }

  public static fromFirebaseJson(data: { userID: string; jobHistory: object[] | null; dateOfGraduation: Date | null }): AlumniProfile {
    return new AlumniProfile(data.jobHistory ? data.jobHistory.map((job) => Job.fromFirebaseJson(job)) : null, data.dateOfGraduation);
  }
}
