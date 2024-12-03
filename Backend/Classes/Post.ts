import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class Post implements IJSONData {
  public title: string;
  public postingUser: string;
  public content: string;

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
