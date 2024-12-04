import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IJSONData } from "./IDatabaseAdapter";

export class Group implements IJSONData{
    public name:string;
    public description: string;
    public usersList:string[];
    public groupAdminList: string[];

    constructor(_name:string, _description:string, _usersList: string[], _groupAdminList:string[]){
        this.name = _name;
        this.description = _description;
        this.usersList = _usersList;
        this.groupAdminList=_groupAdminList;
    }

    public static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"Group">(FirebaseAdapterFactory,"Groups");
    }

    public GetJsonData(): object {
        const data = {...this};
        return data;
    }

    public static fromFirebaseJson(data:{name:string, description:string, usersList:string[], groupAdminList:string[]}):Group{
        return new Group(data.name, data.description, data.usersList, data.groupAdminList);
    }


}