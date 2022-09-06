import {Component, OnInit} from '@angular/core';
import {Cruise} from "./Cruise";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CruiseService} from "./cruise.service";
import {Route} from "./route";
import {Port} from "./port";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public cruiseToString(cruise :Cruise):string{
    let dates = cruise.dates.toString();
    let ports = cruise.route.ports.toString();
    let delays = cruise.route.delays.toString();
    let staff = cruise.staff.toString();
    return  'cruise {id: '+cruise.id+',\n dates: {'+dates+'},\n route: { id: '+
      cruise.route.id+',\n ports:{'+ports+'},\n delays:{'+delays+'}\n},ship:{ id:'+
      cruise.ship.id+',\n'+' name : '+cruise.ship.name+',\n economCost: '
      +cruise.ship.economCost+',\n economPlaces: '+cruise.ship.economTotalPlaces
      +',\n middleCost: '+cruise.ship.middleCost+',\n middlePlaces: '+
      cruise.ship.middleTotalPlaces+',\n premiumCost: '+cruise.ship.premiumCost
      +',\n premiumPlaces: '+cruise.ship.premiumTotalPlaces+',\n seats: '+
      cruise.ship.totalSeats+' },\n staff: {'+staff+'},\n econom: '
      +cruise.economTickets+',\n middle: '+cruise.middleTickets+',\n premium: '+
      cruise.premiumTickets+ ' }';
  }
  public portsToString(route : Route):string{
    let result = '';
    for(let i =0;i<route.ports.length;i++){
      result+=route.ports[i].city+' - ';
    }
    result=result.substring(0,result.length-2).trim();
    return result;
  }
  public getDateFromString(dateString:string):Date{
    let date= new Date();
    date.setTime(0);
    if(dateString.indexOf('T')<0){
      let segments = dateString.split("-");
      date.setFullYear(parseInt(segments[0]));
      date.setMonth(parseInt(segments[1])-1);
      date.setDate(parseInt(segments[2]));
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      return date;
    }else {
      let segments= dateString.split("T");
      let hoursMins=segments[1].split(":");
      segments = segments[0].split("-");
      date.setFullYear(parseInt(segments[0]));
      date.setMonth(parseInt(segments[1])-1);
      date.setDate(parseInt(segments[2]));
      date.setHours(parseInt(hoursMins[0]));
      date.setMinutes(parseInt(hoursMins[1]));
      date.setSeconds(0);
      return date;}
  }
  private calibrateDate():void{
    for (let i=0;i<this.cruises.length;i++){
      for(let j=0;j<this.cruises[i].dates.length;j++){
        let fakeDate = this.cruises[i].dates[j];
        let date = fakeDate.split('T')[0];
        let time = fakeDate.split('T')[1];
        let hour:number = parseInt(time.split(':')[0]);
        hour= hour+3
        this.cruises[i].dates[j]=date+'T'+hour+time.substring(2,time.length);
      }
    }
  }
  public getDepartureDate(cruise:Cruise):string{
    let date = this.getDateFromString(cruise.dates[0]).toString();
    return date.split(":00 ")[0]
  }
  public isThereFreePlaces(cruise:Cruise):boolean{
    return cruise.ship.totalSeats>(cruise.economTickets+cruise.middleTickets+cruise.premiumTickets);
  }
  public max():boolean{
    if(this.page==null){
      this.page=1;
    }
    if(this.size==null){
      this.size=3;
    }
    console.log('page'+this.page);
    console.log('size'+this.size);
    console.log('count'+this.countVar)
    return (this.countVar > (this.page+1 * this.size))
  }
  public _max = this.max();
  public size:any;
  public cruises:any;
  public countVar:any;
  public page:any;
  constructor(private cruiseService:CruiseService) {
  }
  public getCruises(page:number,size:number):void{
    this.cruiseService.getCruises(page,size).subscribe(
      (response:Cruise[])=>{
        this.cruises=response;
       this.calibrateDate();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public count():void{
    this.cruiseService.countCruises().subscribe(
      (response:number)=>{
        this.countVar= response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }
  ngOnInit() {
  if(this.page==null){
    this.page=1;
  }
  if(this.size==null){
    this.size=3;
  }

    this.getCruises(this.page,this.size);
    this.count();


  }
}
