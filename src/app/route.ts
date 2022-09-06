import {Port} from "./port";
export interface Route{
  id:number;
  ports :Port[];
  delays: number[];
}
