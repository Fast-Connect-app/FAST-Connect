import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";
import { ISaveById } from "../DatabaseInterfaces/ISaveById";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";
import { ILoadByName } from "../DatabaseInterfaces/ILoadByName";
import { IModify } from "../DatabaseInterfaces/IModify";

// Only implement interfaces that are required for each type

export type InterfaceTypes = {
    Profile: ISaveById & ILoadById & ILoadByName & IModify;
    
    Event: ISaveObject & ILoadById & ILoadAll & ILoadByName;
    
    Group: ISaveObject & ILoadForMember & ILoadById & IModify;
    
    Post: ISaveObject & ILoadAll & ILoadById & IDelete;
    
    DirectMessage: ISaveById & ILoadAll & ISaveObject;
    
    GroupMessage: ISaveById & ILoadAll;
    
    GlobalMessage: ISaveById & ILoadAll;
    
    PostMessage: ISaveById & ILoadAll;

  UserContactSave: ISaveById & IModify & ILoadByName;

  UserBlock: ISaveById & IDelete & IModify;

  Job: ISaveObject & ILoadAll & ILoadById & ILoadByName;

  StudyMaterial: ISaveObject & ILoadById & ILoadAll & ILoadByName;
};
