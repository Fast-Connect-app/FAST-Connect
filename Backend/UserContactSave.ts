export class UserContactSave{
    private savingUserId:string;
    private savedUserId:string;
    private savedUserName:string;

    constructor(_savingUserId:string, _savedUserId:string, _savedUserName:string){
        this.savingUserId = _savingUserId;
        this.savedUserId = _savedUserId;
        this.savedUserName = _savedUserName;
    }
}