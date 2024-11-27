import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { DatabaseAdapterFactory } from "../DatabaseFactory/DatabaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class Events implements IDatabaseAdapter{
    private title:string;
    private dateOfOccurence:Date;
    private description:string;
    private headUser:string;
    private venue:string;

    private static firebaseAdapter:any;

    constructor(_title:string, _dateOfOccurence:Date, _description:string, _headUser:string, _venue:string){
        this.title = _title;
        this.dateOfOccurence = _dateOfOccurence;
        this.description = _description;
        this.headUser = _headUser;
        this.venue = _venue;

        if(Events.firebaseAdapter == null)
            Events.firebaseAdapter = DatabaseAdapterFactory.CreateAdapter<"Event">("firebase","Events");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return Events.firebaseAdapter;
    }
}