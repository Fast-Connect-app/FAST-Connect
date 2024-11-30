import { ISaveObject } from "../DatabaseInterfaces/ISaveObject"
import { ISaveById } from "../DatabaseInterfaces/ISaveById"
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadLimited } from "../DatabaseInterfaces/ILoadLimited";
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";
import { ILoadByName } from "../DatabaseInterfaces/ILoadByName";


// Only implement interfaces that are required for each type

export type InterfaceTypes = {
    Profile: ISaveObject & ISaveById & ILoadForUser & ILoadById & ILoadByName;
    
    Event: ISaveObject & ILoadById & ILoadAll & ILoadByName;
    
    Group: ISaveById & ISaveObject & ILoadForMember & ILoadById & IDelete;
    
    Post: ISaveObject & ILoadAll & ILoadById & IDelete;
    
    DirectMessage: ILoadForUser & ISaveById & ISaveObject & ILoadOnChange & ILoadLimited;
    
    GroupMessage: ISaveObject & ISaveById & ILoadOnChange & ILoadLimited;
    
    GlobalMessage: ISaveObject & ISaveById & ILoadOnChange  & ILoadLimited;
    
    UserContactSave: ISaveObject & ISaveById & ILoadForUser;
    
    UserBlock: ISaveObject & ISaveById & IDelete & ILoadForUser;
    
    Job: ISaveObject & ILoadAll & ILoadById & IDelete & ILoadByName;
    
    StudyMaterial: ISaveObject & ILoadById & ILoadAll & ILoadByName;
}
