import { ISaveObject } from "../DatabaseInterfaces/ISaveObject"
import { IModifyById } from "../DatabaseInterfaces/IModifyById"
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadLimited } from "../DatabaseInterfaces/ILoadLimited";
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";



// Only implement interfaces that are required for each type

export type InterfaceTypes = {
    User: ISaveObject;
    Profile: ISaveObject & IModifyById;
    Event: ISaveObject & ILoadById & ILoadAll;
    Group: IModifyById & ISaveObject & ILoadForMember & ILoadById & IDelete;
    Post: ISaveObject & ILoadAll & ILoadById & IDelete;
    DirectMessage: ILoadForUser & IModifyById & ISaveObject & ILoadOnChange & ILoadLimited;
    GroupMessage: ISaveObject & IModifyById & ILoadForMember & ILoadOnChange & ILoadLimited;
    GlobalMessage: ISaveObject & IModifyById & ILoadOnChange  & ILoadLimited;
    UserContactSave: ISaveObject & IModifyById & ILoadForUser;
    UserBlock: ISaveObject & IModifyById & IDelete & ILoadForUser;
    Job: ISaveObject & ILoadAll & ILoadById & IDelete;
    StudyMaterial: ISaveObject & ILoadById & ILoadAll;
}
