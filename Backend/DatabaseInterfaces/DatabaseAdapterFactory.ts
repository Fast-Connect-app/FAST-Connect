import { ISaveObject } from "../DatabaseAdapter/ISaveObject"
import { ISaveById as IModifyById } from "../DatabaseAdapter/ISaveById"
import { ILoadById } from "../DatabaseAdapter/ILoadById";
import { ILoadAll } from "../DatabaseAdapter/ILoadAll";
import { ILoadForUser } from "../DatabaseAdapter/ILoadForUser";
import { ILoadOnChange } from "../DatabaseAdapter/ILoadOnChange";
import { IDelete } from "../DatabaseAdapter/IDelete";

type InterfaceTypes<T> = {
    User: ISaveObject<T>;
    Profile: ISaveObject<T> & IModifyById<T>;
    Events: ISaveObject<T> & ILoadById<T> & ILoadAll<T>;
    Group: IModifyById<T> & ISaveObject<T> & ILoadForUser<T> & ILoadById<T> & IDelete<T>;
    Post: ISaveObject<T> & ILoadAll<T> & ILoadById<T> & IDelete<T>;
    DirectMessages: ILoadForUser<T> & IModifyById<T> & ISaveObject<T> & ILoadOnChange<T>;
    GroupMessages: ISaveObject<T> & IModifyById<T> & ILoadForUser<T> & ILoadOnChange<T>;
    GlobalMessages: ISaveObject<T> & IModifyById<T> & ILoadAll<T> & ILoadOnChange<T>;
    UserSaveContact: ISaveObject<T> & IModifyById<T> & ILoadForUser<T>;
    UserBlock: ISaveObject<T> & IModifyById<T> & IDelete<T> & ILoadForUser<T>;
}