import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter, IJSONData } from "./IDatabaseAdapter";

export class Post implements IDatabaseAdapter, IJSONData {
  private title: string;
  private postingUser: string;
  private content: string;

  constructor(_title: string, _postingUser: string, _content: string) {
    this.content = _content;
    this.postingUser = _postingUser;
    this.title = _title;
  }

  public GetDatabaseAdapter() {
    return GetDatabaseAdapter<"Post">(FirebaseAdapterFactory, "Posts");
  }

  public GetJsonData(): object {
    const data = { ...this };
    return data;
  }
}
