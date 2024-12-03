import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class UserBlock implements IJSONData {
  public blockingUserId: string;
  public blockedUserId: string;
  public isBlocked: boolean;

  constructor(_blockingUserId: string, _blockedUserId: string, _isBlocked: boolean) {
    this.blockingUserId = _blockingUserId;
    this.blockedUserId = _blockedUserId;
    this.isBlocked = _isBlocked;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"UserBlock">(FirebaseAdapterFactory, "UserBlocks");
  }

  public GetJsonData(): object {
    const data = { ...this };
    return data;
  }
}
