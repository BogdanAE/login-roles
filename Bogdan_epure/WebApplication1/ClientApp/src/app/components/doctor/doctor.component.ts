import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

    private subscriberGetUSer: any;
    public userIdentity: any;

    constructor(private authService: AuthorizeService, private http: HttpClient) { }

    ngOnInit() {
        this.subscriberGetUSer = this.authService.getUser().subscribe((res: any) => {
            this.userIdentity = res;
            console.log(this.userIdentity);
        });
    }

    sendRole(role: string, email: string) {
        role = 'admin'; email = 'ep.bogdy@gmail.com';
        let params = '?userRole='+role+'&email='+email;
        this.http.post('appcl/assignRoleToUser'+params,null).subscribe(res => console.info(res), err => console.warn(err));

    }

}
