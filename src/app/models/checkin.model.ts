export interface TimeCheckInOutData {
  checkinTime: Date;
  checkoutTime: Date;
  checkMedical: boolean;
}

export interface TimeCheckInOut extends CheckBase {
  data: TimeCheckInOutData;
}

export interface CheckInOut extends CheckBase {
  data: number;
}

export interface CheckBase {
  resultCode: number;
  message: string;
}

export interface DataBase {
  name: string;
  id: number;
  data: DataParamHeader;
}

export class DataParamHeader {
  userid: number;
  deviceid: string;
  ipGateway: string;
  UserAgent: string;
  Authorization_1: string;
  Authorization_2: string;
  dateCheckInOut: string;
  IfNoneMatch: string;
  type: number;
  reason: string;
  
}

export interface TimeStatus extends CheckBase {
  numOfNotification: number;
  fullName: string;
  email: string;
  checkinTime: Date;
  checkoutTime: Date;
  resultStatus: number;
  checkinOnSitePosition: CheckinOnSitePosition;
  checkoutOnSitePosition: CheckoutOnSitePosition;
  attendanceWFH: AttendanceWFH;
  attendanceOnsite: any[];
  checkMedical: boolean;
}

export interface DayStatus extends CheckBase {
  data: TimeStatus;
}


export interface CheckinOnSitePosition {
}

export interface CheckoutOnSitePosition {
}

export interface CheckinDevice {
}

export interface OnSitePosition {
}

export interface Checkin {
  checkinDevice: CheckinDevice;
  onSitePosition: OnSitePosition;
  time?: any;
}

export interface CheckoutDevice {
}

export interface OnSitePosition2 {
}

export interface Checkout {
  checkoutDevice: CheckoutDevice;
  onSitePosition: OnSitePosition2;
}

export interface AttendanceWFH {
  checkin: Checkin;
  checkout: Checkout;
}




export class LoginRequest{
  username: String;
  password:String;
  buildNumber:String;
  version:String;
  deviceIP:String;
  deviceModel:String;
  osVersion:String;


}



export interface LoginResponse extends CheckBase {
  data:InfoUser;

}

export interface InfoUser {
  token: String;
  userId:String;
  employeeId:String;
  username:String;
  fullName:String;
  email:String;
  avatarUrl:String;
  deviceStatus: number;
  medicalStatus:boolean;
  formTitle:String;
  adminRole:String;
  covid_fpt:boolean;
  olympic:boolean;
  iPaper:boolean;
  stayInterview:boolean;
  etmsId:number;
}