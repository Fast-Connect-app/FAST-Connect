import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class StudyMaterial implements IJSONData {
  public senderUserId: string;
  public fileMaterial: string;

  constructor(_senderUserId: string, _fileMaterial: string) {
    this.fileMaterial = _fileMaterial;
    this.senderUserId = _senderUserId;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"StudyMaterial">(FirebaseAdapterFactory, "StudyMaterial");
  }

  public GetJsonData(): object {
    const data = { ...this };
    return data;
  }
}
