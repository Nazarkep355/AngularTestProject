import {Route} from "./route";
import {Ship} from "./ship";
import {Staff} from "./staff";

export interface Cruise {
  id: number;
  dates: string[];
  route: Route;
  ship: Ship;
  staff: Staff[];
  economTickets: number;
  middleTickets: number;
  premiumTickets: number;

}
