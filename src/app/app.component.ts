import { Component } from '@angular/core';
import { CheckinService } from './services/checkin.service';
import { DataBase, DataParamHeader, DayStatus, InfoUser, LoginRequest } from './models/checkin.model';

import * as moment from 'moment-timezone'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'checkin';
  data = new Array<DataBase>();
  requestLogin = new LoginRequest();
  status: string;
  dayStatus: DayStatus;
  pass: string;
  user: string;
  baseData = new DataParamHeader();

  loginData: InfoUser;
  constructor(public checkInService: CheckinService) {
 
    this.baseData.deviceid = 'D545B663-D69D-4654-B53A-A8264EC41E96';
    this.baseData.ipGateway='10.86.156.1',//'10.86.161.49',//'10.86.156.1';
    this.baseData.UserAgent='FIS/10937 CFNetwork/1335.0.3 Darwin/21.6.0'; //FIS/10929 CFNetwork/1335.0.3 Darwin/21.6.0
    this.baseData.IfNoneMatch= `W/"229-QwF4wWUsartlJ3/X6lkYDT7XI2A"`;//W/"7c9-gMazYjggsFAEURAFieej1LjcLCQ"
    this.baseData.type= 0;
    
    this.user = localStorage.getItem('user');
    this.pass = localStorage.getItem('pass');

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
  login() {
    this.requestLogin.buildNumber = '10937';
    this.requestLogin.version = '1.78';
    this.requestLogin.deviceModel = "unknown";
    this.requestLogin.osVersion = "15.6.1";
    this.requestLogin.deviceIP = "10.86.156.1";//192.168.1.4,10.86.156.1
    this.requestLogin.username = this.user;
    this.requestLogin.password = this.pass;
    localStorage.setItem('user', this.user);
    localStorage.setItem('pass', this.pass);

    this.checkInService.login(this.baseData, this.requestLogin ).subscribe(val => {
     this.status = val.message;
     this.loginData = val.data;
     console.log(this.loginData.token);
    })
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
  checkIn() {
    this.status = ''
   // item.data.reason = this.reason;
    this.checkInService.CheckInAll(this.baseData, this.loginData).subscribe(val => {
      this.status = val.message

      if (val.resultCode == 1) {
        this.baseData.type = 1;
        this.baseData.dateCheckInOut = moment(val.data.checkinTime).utc().format('DD-MM-YYYY hh:mm:ss');
        this.status = val.data.checkinTime.toString();
        // this.checkInService.CheckInOut(this.baseData,this.loginData).subscribe(rs => {
        //   this.status = JSON.stringify(val)//.message
        //   if (rs.resultCode == 1) {
        //     this.status += val.data.checkinTime;
        //   }
        // });
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

  checkOut() {
    this.status = ''
    this.checkInService.CheckOutAll(this.baseData, this.loginData).subscribe(val => {
      this.status = val.message
      if (val.resultCode == 1) {
        this.baseData.type = 2;
        this.baseData.dateCheckInOut = moment(val.data.checkinTime).utc().format('DD-MM-YYYY hh:mm:ss');
        console.log(this.baseData.dateCheckInOut)
     //   this.status = val.data.checkoutTime.toString();
        // this.checkInService.CheckInOut(this.baseData, this.loginData).subscribe(rs => {
        //   this.status = JSON.stringify(val)
        //   if (rs.resultCode == 1) {
        //     this.status += val.data.checkoutTime;
        //   }
        // })
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


//token login: 
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTIzNjhjNGM0YjgzMGY4YTZkM2ZkYSIsImlhdCI6MTY2MDgxMjk3MSwiZXhwIjoxNjYxMDcyMTcxfQ.JDmyF-vCattVJkjIxkIvuXIen3XjryWEdGU9byG0fi4