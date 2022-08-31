import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CheckInOut, TimeCheckInOut, DataBase, DayStatus, LoginRequest, LoginResponse, InfoUser, DataParamHeader } from '../models/checkin.model';

export const enum ApiUrl {
  HOST = 'https://ddc.fis.vn',
  LOGIN = '/fis0/api/login',

  // GET_TIME_CHECKIN = '/fis0/api/checkin',
  // GET_TIME_CHECKOUT = '/fis0/api/checkout',
  CHECK_IN_ALL = '/fis0/api/checkin_all',
  CHECK_OUT_ALL = '/fis0/api/checkout_all',
  PUT_CHECKIN_OUT = '/apietms/api/ChechInData/MobileAddCheckInOut',
  CHECK_STATUS = '/fis0/api/get_day_status',
  CHECK_MED = '/fis0/api/send_medical_form'
}

@Injectable()
export class CheckinService {

  constructor(private httpClient: HttpClient) {
    
  }

  //GetCheckOut(data: DataBase): Observable<TimeCheckInOut> {
   
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  // // headers = headers.append('If-None-Match', data.data.IfNoneMatch);
  //  headers = headers.append('User-Agent', data.data.UserAgent);
  //  headers = headers.append('deviceid', data.data.deviceid);
  //  headers = headers.append('ipGateway', data.data.ipGateway);
  //  headers = headers.append('Authorization', `${data.data.Authorization_2}`);
  // // headers = headers.append('ssid', '');
  //  return this.httpClient.get<TimeCheckInOut>(`${ApiUrl.HOST}${ApiUrl.GET_TIME_CHECKOUT}`, { headers: headers });
  //}

  CheckInAll(data: DataParamHeader, infoUser: InfoUser): Observable<TimeCheckInOut> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('User-Agent', data.UserAgent);
     headers = headers.append('Authorization', `Bearer ${infoUser.token}`);
     headers = headers.append('If-None-Match', data.IfNoneMatch);

    return this.httpClient.post<TimeCheckInOut>(`${ApiUrl.HOST}${ApiUrl.CHECK_IN_ALL}`,
      { deviceid: data.deviceid, ipGateway: data.ipGateway, type: 0 },
      { headers: headers });
  }

  CheckOutAll(data: DataParamHeader, infoUser: InfoUser): Observable<TimeCheckInOut> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('User-Agent', data.UserAgent);
    headers = headers.append('Authorization', `Bearer ${infoUser.token}`);
    headers = headers.append('If-None-Match', data.IfNoneMatch);
    return this.httpClient.post<TimeCheckInOut>(`${ApiUrl.HOST}${ApiUrl.CHECK_OUT_ALL}`,
      { deviceid: data.deviceid, ipGateway: data.ipGateway, type: 0 }, { headers: headers } );
  }

  CheckInOut(data: DataParamHeader, infoUser: InfoUser): Observable<CheckInOut> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('User-Agent', data.UserAgent);
    headers = headers.append('Authorization', `Bearer ${infoUser.token}`);

    console.log(infoUser.token);
   // let params = new HttpParams().set('userId', data.data.userid.toString());
    //params = params.append('typeCheckInOut', data.data.type.toString());
    //params = params.append('dateCheckInOut', data.data.dateCheckInOut.toString());
    return this.httpClient.post<CheckInOut>(`${ApiUrl.HOST}${ApiUrl.PUT_CHECKIN_OUT}?userId=${infoUser.userId}&typeCheckInOut=${data.type}&dateCheckInOut=${data.dateCheckInOut}`,
      {}, { headers: headers });
  }

  GetDayStatus(data: DataBase): Observable<DayStatus>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('If-None-Match', data.data.IfNoneMatch);
    headers = headers.append('User-Agent', data.data.UserAgent);
    headers = headers.append('Authorization', `Bearer ${data.data.Authorization_2}`);

    // headers = headers.append('ssid', '');

    return this.httpClient.get<DayStatus>(`${ApiUrl.HOST}${ApiUrl.CHECK_STATUS}`, { headers: headers });
  }

  //CheckMed(data: any): Observable<any> {
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //  headers = headers.append('Referer', `https://api.fis.vn:9999/tdcmobileapp/covid_medical_form/luantd4`);
  //  console.log(headers)
  //  return this.httpClient.post<any>(`${ApiUrl.HOST}${ApiUrl.CHECK_MED}`, data, { headers: headers });
  //}

  login(data: DataParamHeader, bodyRq: LoginRequest): Observable<LoginResponse> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('User-Agent', data.UserAgent);
    headers = headers.append('If-None-Match', data.IfNoneMatch);
    return this.httpClient.post<LoginResponse>(`${ApiUrl.HOST}${ApiUrl.LOGIN}`,
    bodyRq, { headers: headers } );
  }
}
