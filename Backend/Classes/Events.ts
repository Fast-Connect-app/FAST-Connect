import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class Events implements IDatabaseAdapter{
    private title:string;
    private dateOfOccurence:Date;
    private description:string;
    private headUser:string;
    private venue:string;

    constructor(_title:string, _dateOfOccurence:Date, _description:string, _headUser:string, _venue:string){
        this.title = _title;
        this.dateOfOccurence = _dateOfOccurence;
        this.description = _description;
        this.headUser = _headUser;
        this.venue = _venue;
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Event">(FirebaseAdapterFactory,"Events");
    }
}