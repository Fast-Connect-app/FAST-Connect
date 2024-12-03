export interface ILoadLimited{
    LoadLimited(maxLoads : number):Promise<object    | null>;
}