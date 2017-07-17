import { Component , OnInit , ViewEncapsulation } from '@angular/core';
import { ActivatedRoute , Params , NavigationExtras } from '@angular/router';
import { KeysPipe } from '../../pipes/keys';
import { PdService } from '../../services/pd.service';
import { Config } from '../../services/config.service';
import { Router } from '@angular/router';



@Component({
  selector: 'calendar',
  template: require('./template.html'),
  styles : [require('./base-dark.css'),require('./styles.css')],
  encapsulation: ViewEncapsulation.None
})

export class Calendar implements OnInit {

  private ready : boolean;
  private weekDays : Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private monthsName : Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private currentDate : any = null;
  private opts : any;
  private fromDate : any;
  private toDate : any;

  private reservationOpen : boolean = false;
  selectedEvent : any ;


  monthsOptions : any[] = [];
  currentMonthOpt : any = {};
  yearsOptions : any[] = [];
  locationsOptions : any[] = [];
  dates : any = {years : {}};

  defaultFilterMonth : any;
  defaultFilterYear : any;
  defaultFilterLocation : any;

  activeFilter : any;



  constructor(
    private PdService : PdService ,
    private config: Config,
    private route : ActivatedRoute,
    private router: Router ){

      this.selectedEvent = {};

    }

  init(startDate ?: string ){

    this.dates = {years : {} };

    let manyMonths : number = 0;

    this.opts = this.config.get().layout.calendar;
    this.fromDate = (startDate) ? new Date(startDate) : new Date(this.opts.calendarStart || new Date());
    this.toDate = new Date((new Date()).setMonth(new Date(this.fromDate).getMonth()+ this.opts.showMonths ));

    // console.log("Show Months: ",this.opts.showMonths);

    // console.log("From Date: ", this.fromDate);
    // console.log("To Date: ", this.toDate);


    // CALCULATE DATES
    let manyYears = this.toDate.getFullYear() - this.fromDate.getFullYear();

    // console.log("Many Years: ",manyYears);

    if(manyYears > 0){
      manyMonths += 12 - this.fromDate.getMonth();
      manyMonths += this.toDate.getMonth();
      if(manyYears > 1){
        manyMonths += (manyYears-1) * 12;
      }
    }else{
      manyMonths = this.toDate.getMonth() - this.fromDate.getMonth();
    }

    // console.log("Many Months: ",manyMonths);

    for(let y = 0 ; y <= manyYears ; y++){
      //YEARS LOOP
      let cal_months = {};

      for(let m = 0 ; ((y > 0) ?  m : m+this.fromDate.getMonth()) <= 11 ; m++){
        //MONTHS LOOP
        let cal_days = {};
        let tempMonth = (y > 0) ? m : m+this.fromDate.getMonth();
        let current_month : any = cal_months[tempMonth+1] = {};
        current_month.name = this.monthsName[tempMonth];
        current_month.index = tempMonth;
        current_month.length = new Date(this.fromDate.getFullYear()+y,tempMonth+1,0).getDate();

        for(let d = 1; d <= current_month.length ; d++){
          //DAYS LOOP
          cal_days[d] = {};
          cal_days[d].index = new Date(this.fromDate.getFullYear()+y,tempMonth,d).getDay();
          cal_days[d].name = this.weekDays[cal_days[d].index];
          cal_days[d].number = d;
          cal_days[d].month_number = current_month.index;
          cal_days[d].month_index = tempMonth+1;
          cal_days[d].month = current_month.name;
          cal_days[d].events = [];
        }
        cal_months[tempMonth+1].days = cal_days;
        if (y === manyYears && tempMonth === this.toDate.getMonth()){

          m = 20; // END LOOP
        }
      }
      this.dates.years[this.fromDate.getFullYear()+y] = {months : cal_months};
    }
    // END CALCULATIONS
    // console.log(this.dates);
  }

  build(events,venues,artists){
    let clonedArray = [];
    for (let i = 0 ; i < events.length ; i++){
      clonedArray.push(events[i]);
    };

    for (let i = 0; i < events.length ; i++){
      let data = events[i];
      if(this.dates.years.hasOwnProperty(data.date.getFullYear())){
        if(this.dates.years[data.date.getFullYear()].months.hasOwnProperty(data.date.getMonth()+1)){
          if(this.dates.years[data.date.getFullYear()].months[data.date.getMonth()+1].days.hasOwnProperty(data.date.getDate())){
            data['venue'] = venues.find((venue)=> venue.id == data['venue_id']);
            for(let a = 0; a < data.artist_event.length;a++){
              data.artist_event[data.artist_event[a].artist_type] = artists.find((artist) => artist.id == data.artist_event[a].artist_id);
              data.artist_event[data.artist_event[a].artist_type].area = data.venue.areas.find((area)=> area.id == data.artist_event[a].area_id);
            }
            this.dates.years[data.date.getFullYear()].months[data.date.getMonth()+1].days[data.date.getDate()].events.push(data);
          }
        }
      }
    }
      this.ready = true;
  }

  updateFilterOptions(){
    for(let i = 0;i<this.monthsName.length;i++){
      this.monthsOptions.push({text : this.monthsName[i],value : i+1});
    };

    this.yearsOptions = [
      { text : (new Date()).getFullYear()-1 , value : (new Date()).getFullYear()-1},
      { text : (new Date()).getFullYear() , value : (new Date()).getFullYear()},
      { text : (new Date()).getFullYear()+1 , value : (new Date()).getFullYear()+1}
    ];

    this.defaultFilterMonth = {text : this.monthsName[(new Date()).getMonth()] , value : this.monthsName[(new Date()).getMonth()].toLowerCase()};
    this.defaultFilterYear = this.yearsOptions[1];
  }

  bootstrap(params){



        this.activeFilter = {
          m : params['m'] || null,
          y : params['y'] || null
        };

         let startDate = null;
         if( params['y'] || params['m']){
           startDate =  params['y'] || new Date().getFullYear(); // YEAR
           startDate += "-";
           startDate += (params['m']) ? parseInt(params['m']) : new Date().getMonth(); // MONTH
           startDate += "-01";
           if( params['m'] ){
             this.defaultFilterMonth = {text : this.monthsName[parseInt(params['m'])-1] , value : this.monthsName[parseInt(params['m'])-1].toLowerCase()};
           }
           if( params['y'] ){
             this.defaultFilterYear = {text : (new Date(params['y']+"-05-31")).getFullYear() , value : (new Date(params['y']+"-05-31")).getFullYear()};
           }
         }



         this.init(startDate || null);

         this.PdService.venues(this.config.get().data.venues).then((venues : any)=> {
           this.locationsOptions = [];
           for(let venue of venues){
             this.locationsOptions.push({text : venue.city + ", " + venue.state, value : venue.id});

           };

           this.PdService.events({venues : this.config.get().data.venues}).then((index : any)=> {
             this.PdService.events().then((index : any)=> {
               this.PdService.artists().then((artists : any)=> {
                 this.build(index.events,venues,artists);
               });
             });
           });
         });


  }

  ngOnInit(){
    this.updateFilterOptions();
    return this.route.queryParams.subscribe(params => {
      this.bootstrap(params);
    });

  }

  filterChanged(filterOption){
    this.activeFilter[filterOption.name] = filterOption.option.value;
    let newFilterQuery = {};
    for(let key in this.activeFilter){
      if(this.activeFilter[key]){
        newFilterQuery[key] = this.activeFilter[key];
      }
    }
    let navigationExtras: NavigationExtras = {
      queryParams: newFilterQuery
    };
    this.router.navigate(['events'], navigationExtras);
  }

  onReservationClick(ev){
    this.reservationOpen = true;
    this.selectedEvent = ev;
  }


}
