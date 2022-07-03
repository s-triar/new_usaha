import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CUSTOM_HEADER } from 'src/app/application/constant';


export class ApiCallService {

  constructor(protected http: HttpClient) { }

  protected getHeaderShowLoading(header: HttpHeaders): HttpHeaders{
    if (header.get(CUSTOM_HEADER.showLoading) === null){
      header = header.set(CUSTOM_HEADER.showLoading, 'true');
    }
    return header;
  }
  protected getHeaderShowNotify(header: HttpHeaders): HttpHeaders{
    if (header.get(CUSTOM_HEADER.showNotify) === null){
      header = header.set(CUSTOM_HEADER.showNotify, 'true');
    }
    return header;
  }
}
