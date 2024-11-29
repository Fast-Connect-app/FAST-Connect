import { BaseDatabaseAdapter } from "../DatabaseFactory/BaseDatabaseAdapter";
import { FirebaseAdapterFactory } from "../DatabaseFactory/FirebaseAdapterFactory";
import { IDatabaseAdapter } from "./IDatabaseAdapter";

export class StudyMaterial implements IDatabaseAdapter{
    private senderUserId:string;
    private fileMaterial:string;

    private static firebaseAdapter:any;

    constructor(_senderUserId: string, _fileMaterial:string){
        this.fileMaterial = _fileMaterial;
        this.senderUserId = _senderUserId;
    
        if(StudyMaterial.firebaseAdapter == null)
            StudyMaterial.firebaseAdapter = FirebaseAdapterFactory.CreateAdapter<"StudyMaterial">("StudyMaterials");
    }

    GetDatabaseAdapter(): BaseDatabaseAdapter {
        return StudyMaterial.firebaseAdapter;
    }
}