export interface ILoadLimited{
    LoadLimited(maxLoads : number):Promise<string | null>;
}