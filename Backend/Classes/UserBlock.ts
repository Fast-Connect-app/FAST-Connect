export class UserBlock{
    private blockingUserId:string;
    private blockedUserId:string;
    private isBlocked:boolean;

    constructor(_blockingUserId:string, _blockedUserId:string, _isBlocked:boolean){
        this.blockingUserId = _blockingUserId;
        this.blockedUserId = _blockedUserId;
        this.isBlocked = _isBlocked;
    }
}