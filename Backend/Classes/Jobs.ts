import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class Jobs implements IJSONData{
    public title:string;
    public category:string;
    public description:string;
    public salary:number;
    public ownerUserId:string;
    public location:string;

    constructor(_title:string, _salary:number, _ownerUserId:string, _category:string, _description:string, _location:string){
        this.title = _title;
        this.salary = _salary;
        this.ownerUserId = _ownerUserId;
        this.category = _category;
        this.description = _description;
        this.location = _location;
    }

    public static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Job">(FirebaseAdapterFactory,"Jobs");
    }

    public GetJsonData(): object {
        const data = {...this};
        return data;
    }
}