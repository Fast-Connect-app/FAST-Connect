import { Timestamp } from "firebase-admin/firestore";
import { IJSONData } from "./IDatabaseAdapter";

export class Message implements IJSONData{
    public sender:string;
    public text:string;
    public file : string | null;
    public timeStamp: Date;

    constructor(_senderID:string, _content:string, _FileAttachment:string | null, _TimeStamp:Date){
        this.sender = _senderID;
        this.text = _content;
        this.file = _FileAttachment;
        this.timeStamp = _TimeStamp;
    }
    
    public GetJsonData():object{
        const data = {...this};
        return data;
    }

    public static fromFirebaseJson(data:{sender:string, text:string, file:string | null, timeStamp:Timestamp}):Message{
        const newDate= new Date()
        return new Message(data.sender, data.text, data.file, newDate);
    }
}