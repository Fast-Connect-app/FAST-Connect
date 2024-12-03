//interface so that all the classes can override to return their own types of adapter

import { FirebaseAdapter } from "../DatabaseFactory/FirebaseAdapter";

interface IDatabaseAdapter {
  GetDatabaseAdapter();
}

interface IJSONData {
  GetJsonData(): object;
}

export { IDatabaseAdapter, IJSONData };
