import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class Group implements IDatabaseAdapter{
    private name:string;
    private description: string;
    private usersList:string[];
    private groupAdminList: string[];

    private static firebaseAdapter:any;

    constructor(_name:string, _description:string, _usersList: string[], _originalAdmin:string){
        this.name = _name;
        this.description = _description;
        this.usersList = _usersList;

        this.groupAdminList.push(_originalAdmin)

        if(Group.firebaseAdapter == null)
            Group.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"Group">("Groups");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return Group.firebaseAdapter;
    }
}