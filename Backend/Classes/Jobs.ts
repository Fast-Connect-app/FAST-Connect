import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class Jobs implements IDatabaseAdapter{
    private title:string;
    private salary:number;
    private ownerUserId:string;

    constructor(_title:string, _salary:number, _ownerUserId:string){
        this.title = _title;
        this.salary = _salary;
        this.ownerUserId = _ownerUserId;
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Job">(FirebaseAdapterFactory,"Jobs");
    }
}