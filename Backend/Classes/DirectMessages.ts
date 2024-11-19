import { Message } from "./Message";

export class DirectMessages{
    private userToUserId:string;
    private messages:Message[];
    
    constructor(_userToUserId:string){
        this.userToUserId = _userToUserId;
    }
}