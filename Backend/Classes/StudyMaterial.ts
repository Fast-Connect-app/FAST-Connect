import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter, IJSONData } from "./IDatabaseAdapter";

export class StudyMaterial implements IDatabaseAdapter, IJSONData {
  private senderUserId: string;
  private fileMaterial: string;

  constructor(_senderUserId: string, _fileMaterial: string) {
    this.fileMaterial = _fileMaterial;
    this.senderUserId = _senderUserId;
  }

  public GetDatabaseAdapter() {
    return GetDatabaseAdapter<"StudyMaterial">(FirebaseAdapterFactory, "StudyMaterial");
  }

  public GetJsonData(): object {
    const data = { ...this };
    return data;
  }
}
