import { ISubscriber } from "../Classes/ISubscriber";

export interface IPublisher{
    AddSubscriber(subscriber:ISubscriber):void;
    RemoveSubscriber(subscriber:ISubscriber):void;
    NotifySubscribers(data):void;
}