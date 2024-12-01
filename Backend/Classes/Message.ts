import { IJSONData } from "./IDatabaseAdapter";

export class Message implements IJSONData{
    private senderId:string;
    private content:string;
    private FileAttachment : string | null;
    private TimeStamp: Date;
    private parentMessage:Message | undefined;

    constructor(_senderID:string, _content:string, _FileAttachment:string | null, _TimeStamp:Date, _parentMessage ?: Message){
        this.senderId = _senderID;
        this.content = _content;
        this.FileAttachment = _FileAttachment;
        this.TimeStamp = _TimeStamp;
        this.parentMessage = _parentMessage;
    }
    
    public GetJsonData():string{
        const data = {
            senderId: this.senderId,
            content: this.content,
            fileAttachment: this.FileAttachment,
            timeStamp: this.TimeStamp.toISOString(),
            parentMessage: this.parentMessage?.GetJsonData()
        }

        return JSON.stringify(data);
    }
}