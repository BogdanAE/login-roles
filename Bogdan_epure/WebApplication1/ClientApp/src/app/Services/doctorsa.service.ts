import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorsaService {

    constructor(private http: HttpClient) { }

    getUserRole(email: string) {
        var body = {
            "email": "ep.bogdy@gmail.com"
        }
        return this.http.get('appcl/getUserRole', { params: { email: email } });
    }

    getAllPatients() {
        return this.http.get('appcl/getAllPatients');
    }

    deletePatient(patientName:string, patientId:string) {
        let params = '?userId=' + patientId;
        return this.http.post('appcl/deletePatient' + params, null)
    }

    addPrescription(prescription: string, userId:string) {
        let params = '?presc=' + prescription +'&userId='+userId;
        return this.http.post('appcl/presPatient' + params, null);
    }

    getPatientPrescription(email: string) {
        return this.http.get('appcl/getPrescription', { params: { email: email } });
    }
}
