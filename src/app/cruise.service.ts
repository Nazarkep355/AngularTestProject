import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cruise} from "./Cruise";


@Injectable({providedIn:'root'})
export class CruiseService{
  constructor(private http:HttpClient) {
  }
  public getCruises(page:number,size:number):Observable<Cruise[]>{
    return this.http.get<any>('http://localhost:8080/rest/cruises?size='+size+'&page='+(page-1)+'&sort=id');
  }
  public countCruises():Observable<number>{
    return this.http.get<number>('http://localhost:8080/rest/cruises/size');
  }

}
