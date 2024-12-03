import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";
import { Message } from "./Message";

export class GroupMessages implements IJSONData {
  public groupID: string;
  public messages: Message[];

  constructor(_groupID: string) {
    this.groupID = _groupID;
  }

  public GetDatabaseAdapter() {
    return GetDatabaseAdapter<"GroupMessage">(FirebaseAdapterFactory, "GroupMessages", this.groupID, "Messages");
  }

  public GetJsonData(): object {
    const data = {
      groupID: this.groupID,
      Messages: this.messages.map((message) => message.GetJsonData()),
    };

    return data;
  }
}
