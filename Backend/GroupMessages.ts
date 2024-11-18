import { Message } from "./Message";

export class GroupMessages{
    private groupID:string;
    private messages: Message[];

    constructor(_groupID:string){
        this.groupID = _groupID;
    }
}