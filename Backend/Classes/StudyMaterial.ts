import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class StudyMaterial implements IJSONData {
  public senderUserId: string;
  public topic: string;
  public fileMaterial: string;

  constructor(_senderUserId: string, _fileMaterial: string, _topic: string) {
    this.fileMaterial = _fileMaterial;
    this.senderUserId = _senderUserId;
    this.topic = _topic;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"StudyMaterial">(FirebaseAdapterFactory, "StudyMaterial");
  }

  public GetJsonData(): object {
    const data = { ...this };
    return data;
  }

  public static fromFirebaseJson(data: { senderUserID: string; topic: string; fileMaterial: string }): StudyMaterial {
    return new StudyMaterial(data.senderUserID, data.fileMaterial, data.topic);
  }
}
