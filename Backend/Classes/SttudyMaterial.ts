import { GetDatabaseAdapter } from "../DatabaseFactory/DatabaseAdapterFactory";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class StudyMaterial implements IDatabaseAdapter{
    private senderUserId:string;
    private fileMaterial:string;

    constructor(_senderUserId: string, _fileMaterial:string){
        this.fileMaterial = _fileMaterial;
        this.senderUserId = _senderUserId;
    }

    static GetDatabaseAdapter() {
        return GetDatabaseAdapter<"StudyMaterial">(FirebaseAdapterFactory,"StudyMaterial");
    }
}