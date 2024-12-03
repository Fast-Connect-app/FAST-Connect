import { IJSONData } from "./IDatabaseAdapter";

export class Message implements IJSONData{
    public sender:string;
    public text:string;
    public file : string | null;
    public timeStamp: Date;
    public parentMessage:Message | undefined;

    constructor(_senderID:string, _content:string, _FileAttachment:string | null, _TimeStamp:Date, _parentMessage ?: Message){
        this.sender = _senderID;
        this.text = _content;
        this.file = _FileAttachment;
        this.timeStamp = _TimeStamp;
        this.parentMessage = _parentMessage;
    }
    
    public GetJsonData():object{
        const data = {
            senderId: this.sender,
            content: this.text,
            fileAttachment: this.file,
            timeStamp: this.timeStamp.toISOString(),
            parentMessage: this.parentMessage?.GetJsonData()
        }
        return data;
    }
}