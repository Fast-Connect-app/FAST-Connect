import { IJSONData } from "./IDatabaseAdapter";

export class Message implements IJSONData{
    public senderId:string;
    public content:string;
    public FileAttachment : string | null;
    public TimeStamp: Date;
    public parentMessage:Message | undefined;

    constructor(_senderID:string, _content:string, _FileAttachment:string | null, _TimeStamp:Date, _parentMessage ?: Message){
        this.senderId = _senderID;
        this.content = _content;
        this.FileAttachment = _FileAttachment;
        this.TimeStamp = _TimeStamp;
        this.parentMessage = _parentMessage;
    }
    
    public GetJsonData():object{
        const data = {
            senderId: this.senderId,
            content: this.content,
            fileAttachment: this.FileAttachment,
            timeStamp: this.TimeStamp.toISOString(),
            parentMessage: this.parentMessage?.GetJsonData()
        }
        return data;
    }
}