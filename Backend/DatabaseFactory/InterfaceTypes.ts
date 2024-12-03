import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";
import { ISaveById } from "../DatabaseInterfaces/ISaveById";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadLimited } from "../DatabaseInterfaces/ILoadLimited";
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";
import { ILoadByName } from "../DatabaseInterfaces/ILoadByName";
import { IModify } from "../DatabaseInterfaces/IModify";

// Only implement interfaces that are required for each type

export type InterfaceTypes = {
  Profile: ISaveById & ILoadForUser & ILoadById & ILoadByName & IModify;

  AlumniProfile: ISaveById & ILoadForUser & ILoadById & ILoadByName & IModify;

  StudentProfile: ISaveById & ILoadForUser & ILoadById & ILoadByName & IModify;

  Event: ISaveObject & ILoadById & ILoadAll & ILoadByName;

  Group: ISaveById & ILoadForMember & ILoadById & IDelete & IModify;

  Post: ISaveObject & ILoadAll & ILoadById & IDelete;

  DirectMessage: ILoadForUser & ISaveById & ILoadOnChange & ILoadLimited;

  GroupMessage: ISaveObject & ISaveById & ILoadOnChange & ILoadLimited & IDelete;

  GlobalMessage: ISaveById & ILoadOnChange & ILoadLimited;

  PostMessage: ISaveById & ILoadAll & IDelete;

  UserContactSave: ISaveById & ILoadForUser & IModify;

  UserBlock: ISaveById & IDelete & ILoadForUser & IModify;

  Job: ISaveObject & ILoadAll & ILoadById & IDelete & ILoadByName;

  StudyMaterial: ISaveObject & ILoadById & ILoadAll & ILoadByName;
};
