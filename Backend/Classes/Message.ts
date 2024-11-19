export class Message{
    private senderId:string;
    private content:string;
    private FileAttachment : File | null;
    private TimeStamp: Date;

    constructor(_senderID:string, _content:string, _FileAttachment:File | null, _TimeStamp:Date){
        this.senderId = _senderID;
        this.content = _content;
        this.FileAttachment = _FileAttachment;
        this.TimeStamp = _TimeStamp;
    }
}