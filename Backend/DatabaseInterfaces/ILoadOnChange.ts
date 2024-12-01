import { ISubscriber } from "../Classes/ISubscriber";

export interface ILoadOnChange{
    LoadOnChange(id:string):Promise<void>;
    AddSubscriber(subscriber:ISubscriber):void;
    RemoveSubscriber(subscriber:ISubscriber):void;
    NotifySubscribers(data):void;
}