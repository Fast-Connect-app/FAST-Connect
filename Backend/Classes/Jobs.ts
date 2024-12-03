import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class Jobs implements IJSONData{
    public title:string;
    public salary:number;
    public ownerUserId:string;

    constructor(_title:string, _salary:number, _ownerUserId:string){
        this.title = _title;
        this.salary = _salary;
        this.ownerUserId = _ownerUserId;
    }

    public GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Job">(FirebaseAdapterFactory,"Jobs");
    }

    public GetJsonData(): object {
        const data = {...this};
        return data;
    }
}