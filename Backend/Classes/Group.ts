import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter,IJSONData } from "./IDatabaseAdapter";

export class Group implements IDatabaseAdapter,IJSONData{
    private name:string;
    private description: string;
    private usersList:string[] = [];
    private groupAdminList: string[] = [];

    constructor(_name:string, _description:string, _usersList: string[], _originalAdmin:string){
        this.name = _name;
        this.description = _description;
        this.usersList = _usersList;

        this.groupAdminList.push(_originalAdmin)
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Group">(FirebaseAdapterFactory,"Groups");
    }

    public GetJsonData(): string {
        const data = {...this};
        return JSON.stringify(data);
    }
}