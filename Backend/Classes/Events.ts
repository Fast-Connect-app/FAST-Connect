import { Timestamp } from "firebase-admin/firestore";
import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";

export class Events {
  public eventID: string;
  public title: string;
  public dateOfOccurence: Date;
  public description: string;
  public venue: string;
  public picBase64Compressed: string; 

  constructor(_eventID:string,_title: string, _dateOfOccurence: Date, _description: string,  _venue: string , _picBase64Compressed:string) {
    this.eventID=_eventID;
    this.title = _title;
    this.dateOfOccurence = _dateOfOccurence;
    this.description = _description;
    this.venue = _venue;
    this.picBase64Compressed=_picBase64Compressed;
  }

  public static GetDatabaseAdapter() {
    return GetDatabaseAdapter<"Event">(FirebaseAdapterFactory, "Events");
  }

  public GetJsonData(): object {
    const data = {
      ...this,
      dateOfOccurence: this.dateOfOccurence.toISOString(),
    };
    return data;
  }

  public static fromFirebaseJson( data:{
    eventID:string,
    title: string,
    dateOfOccurence: Timestamp,
    description: string,
    venue: string,
    picBase64Compressed: string
  }) : Events{
    const newDate = new Date(data.dateOfOccurence.seconds * 1000 + data.dateOfOccurence.nanoseconds / 1000000);
    return new Events(data.eventID,data.title, newDate, data.description, data.venue, data.picBase64Compressed);
  }
}
