import { Component } from '@angular/core';
import { CheckinService } from './services/checkin.service';
import { DataBase, DayStatus } from './models/checkin.model';
import * as moment from 'moment-timezone'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'checkin';
  data = new Array<DataBase>();
  status: string;
  dayStatus: DayStatus;
  reason: string;
  constructor(public checkInService: CheckinService) {
    this.data.push(
      {
        id: 1,
        name: 'Luan dep trai',

        data: {
          userid: 14349,
          deviceid: '21C22927-1412-4537-B372-58F205BBCD0E',
          ipGateway: '10.86.156.1',
          UserAgent: 'FIS/10770 CFNetwork/1220.1 Darwin/20.3.0',
          Authorization_1: `Basic c3NkX2FwaTpzc2RAMjAxNw==`,
          Authorization_2: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNmY0OTY5YjU4ZGU5MTRjMDIzY2IyMiIsImlhdCI6MTYyMTMwNjMxNX0.qr-XlTUPfa6DeMSpY5Bm1sdq8kO1IRK45syxwJKL4CM`,
          dateCheckInOut: null,
          IfNoneMatch: `W/"1ca-ABl975jXr4Zg4E5JBWoL+4F5xRM"`,
          type: 0,
          reason: "di lam"
        }
      }
    );

    this.data.push(
      {
        id: 3,
        name: 'Chien',

        data: {
          userid: 14350,
          deviceid: '022BCBB7-67A7-431F-A05F-A86918AC26CE',
          ipGateway: '10.86.156.1',
          UserAgent: 'FIS/9233 CFNetwork/1120 Darwin/19.0.0',
          Authorization_1: `Basic c3NkX2FwaTpzc2RAMjAxNw==`,
          Authorization_2: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTYyMjJlODM1ZmNjMGZlOGM3NGFkOSIsImlhdCI6MTU5MTA4MDQwM30.AvXmLKoi9Il4BQt-IymMd4RKwYg8K7ZB4PACQyRJAbM`,
          dateCheckInOut: null,
          IfNoneMatch: `W/"62-0sIyQmLIjbCpRfFaDL3UCPPLYgI"`,
          reason: this.reason ,

          type: 0       // 1 checkin, 2 checkout
        }
      }
    )

    this.data.push(
      {
        id: 4,
        name: 'CuongLT',

        data: {
          userid: 14088,
          deviceid: 'B92107E5-5D57-4532-A9D6-6C23365ED321',
          ipGateway: '10.86.156.1',
          UserAgent: 'FIS/9233 CFNetwork/1125.2 Darwin/19.0.0',
          Authorization_1: `Basic c3NkX2FwaTpzc2RAMjAxNw==`,
          Authorization_2: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNmVlODU0ZTc5ZTk5MTkzMDBjZmNiMyIsImlhdCI6MTU5MTMyOTc2MH0.dOsOLGE2RGHXUZ-JGH1t4K0qaLC2NUEN23htLNn9dQ4`,
          dateCheckInOut: null,
          IfNoneMatch: `W/'72-oPOhWteqrXlvY4MdXV5iq+e6P1k'`,
          reason: this.reason,

          type: 0      // 1 checkin, 2 checkout
        }
      }
    );
  }


  ngOnInit(): void {
    //var alarm = moment();
    //alarm.set({ hour: 10, minute: 30, second: 20, millisecond: 30 });
    //var task = setInterval(() => {
    //  var currentTime = new Date().getTime();
    //  console.log(`currentTime`, currentTime);
    //  console.log(`alarm`, alarm);
    //  if (currentTime > alarm.valueOf()) {
    //    console.log(`alarming`);

       
    //    this.checkIn2(this.data[0]).then(val => {
    //      if (val) {
    //        clearInterval(task);
    //      } else {
    //        this.checkInService.GetDayStatus(this.data[0]).subscribe(rs => {
    //          this.status = rs.message;
    //          if (rs.resultCode == 1 && rs.data.checkinTime) {
    //            console.log(`checkinTime`, rs.data.checkinTime);

    //            clearInterval(task);
    //          }
    //        })
    //      }
    //    })
    //  }
    //},5000)
  }
  sendMel() {
    //this.checkInService.CheckMed(this.meForm).subscribe(val => {
    //  this.status = val.message
    //})
  }
  setTimeout_(fn, delay) {
    var maxDelay = Math.pow(2, 31) - 1;

    if (delay > maxDelay) {
      var args = arguments;
      args[1] -= maxDelay;

      return setTimeout(function () {
        this.setTimeout_.apply(undefined, args);
      }, maxDelay);
    }

    return setTimeout.apply(undefined, arguments);
  }
  checkIn(item: DataBase) {
    this.status = ''
    item.data.reason = this.reason;
    this.checkInService.CheckInAll(item).subscribe(val => {
      this.status = val.message

      if (val.resultCode == 1) {
        item.data.type = 1;
        item.data.dateCheckInOut = moment(val.data.checkinTime).utc().format('DD-MM-YYYY hh:mm:ss');
        this.status = ''
        this.checkInService.CheckInOut(item).subscribe(rs => {
          this.status = JSON.stringify(val)//.message
          if (rs.resultCode == 1) {
            this.status += val.data.checkinTime;
          }
        });
      }
    })
  }

  //async checkIn2(item: DataBase) {
  //  var a = await this.checkInService.GetCheckIn(item).toPromise();
  //  if (a.resultCode == 1) {
  //    return true;
  //  } else {
  //    return false;
  //  }
  //}

  checkOut(item: DataBase) {
    this.status = ''
    this.checkInService.CheckOutAll(item).subscribe(val => {
      this.status = val.message
      if (val.resultCode == 1) {
        item.data.type = 2;
        item.data.dateCheckInOut = moment(val.data.checkinTime).utc().format('DD-MM-YYYY hh:mm:ss');
        console.log(item.data.dateCheckInOut)
        this.status = ''
        this.checkInService.CheckInOut(item).subscribe(rs => {
          this.status = JSON.stringify(val)
          if (rs.resultCode == 1) {
            this.status += val.data.checkoutTime;
          }
        })
      }
    })
  }

  checkStatus(item: DataBase) {
    this.checkInService.GetDayStatus(item).subscribe(rs => {
      this.status = rs.message;
      if (rs.resultCode == 1) {
        this.dayStatus = rs;
       // this.dayStatus.data.checkinTime = this.dayStatus.data.checkoutTime;//moment(this.dayStatus.data.checkinTime).utc().format("DD-MM-YYYY hh:mm:ss");
       // this.dayStatus.data.checkoutTime = this.dayStatus.data.checkoutTime;//moment(this.dayStatus.data.checkoutTime).utc().format("DD-MM-YYYY hh:mm:ss")
        //console.log(this.dayStatus.data.checkoutTime)
        //console.log(moment(this.dayStatus.data.checkoutTime).utc().format("DD-MM-YYYY hh:mm:ss"))
      }
    })
  }
}
