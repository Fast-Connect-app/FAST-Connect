import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter, IJSONData } from "./IDatabaseAdapter";

export class UserBlock implements IDatabaseAdapter, IJSONData {
  private blockingUserId: string;
  private blockedUserId: string;
  private isBlocked: boolean;

  constructor(_blockingUserId: string, _blockedUserId: string, _isBlocked: boolean) {
    this.blockingUserId = _blockingUserId;
    this.blockedUserId = _blockedUserId;
    this.isBlocked = _isBlocked;
  }

  public GetDatabaseAdapter() {
    return GetDatabaseAdapter<"UserBlock">(FirebaseAdapterFactory, "UserBlocks");
  }

  public GetJsonData(): string {
    const data = { ...this };
    return data;
  }
}
