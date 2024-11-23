export class StudyMaterial{
    private senderUserId:string;
    private fileMaterial:string;

    constructor(_senderUserId: string, _fileMaterial:string){
        this.fileMaterial = _fileMaterial;
        this.senderUserId = _senderUserId;
    }
}