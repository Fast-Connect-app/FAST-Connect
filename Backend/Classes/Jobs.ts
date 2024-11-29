import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class Jobs implements IDatabaseAdapter{
    private title:string;
    private salary:number;
    private ownerUserId:string;

    private static firebaseAdapter:any;

    constructor(_title:string, _salary:number, _ownerUserId:string){
        this.title = _title;
        this.salary = _salary;
        this.ownerUserId = _ownerUserId;

        if(Jobs.firebaseAdapter == null)
            Jobs.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"Job">("Jobs");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return Jobs.firebaseAdapter;
    }
}