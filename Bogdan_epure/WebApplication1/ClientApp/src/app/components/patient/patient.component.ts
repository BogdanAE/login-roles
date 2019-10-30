import { Component, OnInit } from '@angular/core';
import { DoctorsaService } from '../../Services/doctorsa.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

    prescription: string = "empty";
    constructor( private roleService: DoctorsaService, private authorizeService: AuthorizeService) { }

    ngOnInit() {
        this.authorizeService.getUser().pipe(map(u => u && u.name)).subscribe(res => {
            var userEmail = res;
            if (res) {
                this.roleService.getPatientPrescription(res)
                    .subscribe((role:any) => { console.log(role); this.prescription = role.prescription }, err => console.log(err))
            }
        }, err => console.log(err));
    }

}
