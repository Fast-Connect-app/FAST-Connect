import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { DatabaseAdapterFactory } from "../DatabaseFactory/DatabaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class StudyMaterial implements IDatabaseAdapter{
    private senderUserId:string;
    private fileMaterial:string;

    private static firebaseAdapter:any;

    constructor(_senderUserId: string, _fileMaterial:string){
        this.fileMaterial = _fileMaterial;
        this.senderUserId = _senderUserId;
    
        if(StudyMaterial.firebaseAdapter == null)
            StudyMaterial.firebaseAdapter = DatabaseAdapterFactory.CreateAdapter<"StudyMaterial">("firebase","StudyMaterials");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return StudyMaterial.firebaseAdapter;
    }
}