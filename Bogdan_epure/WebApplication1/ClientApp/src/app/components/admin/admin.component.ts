import { Component, OnInit } from '@angular/core';
import { DoctorsaService } from '../../Services/doctorsa.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface UserOne {
    name: string;
    role: string;
    id: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public usersList: UserOne[] = new Array<UserOne>();
    public usersList1: UserOne[] = new Array<UserOne>();
    public prescription: string = '';

    checkoutForm: any;

    public selectedPatient: any;
    public openInput: boolean = false;

    private usersList2: UserOne[] = [
        {
        id:"21321", name:"aaaaa", role:"patient"
        },
        {
            id: "21322", name: "bbbbb", role: "patient"
        },
        {
            id: "21323", name: "cccc", role: "patient"
        },
        {
            id: "21324", name: "dddd", role: "patient"
        },
        {
            id: "21325", name: "eeeee", role: "patient"
        }
    ]

    constructor(private adminService: DoctorsaService) {
        //this.checkoutForm = this.formBuilder.group({
        //    userId: '',
        //    prescription: ''
        //})
        //this.checkoutForm = new FormGroup({
        //    userId: new FormControl(''),
        //    prescription: new FormControl('')
        //})
    }

    ngOnInit() {
        this.adminService.getAllPatients().subscribe((res: any[]) => {
            console.log(res);
            res.forEach((row: any) => {
                let copy: UserOne = { id: row.id, name: row.email, role: 'patient' }
                this.usersList1.push(copy);
                console.log(this.usersList);
            });
            this.usersList = this.usersList1.concat(this.usersList2);
        }, err => {
                console.warn(err);
        });
    };

    deletePatient(patientName:string, patientId: string) {
        console.log(patientName, patientId);
        this.usersList = this.usersList.filter(row => {
            return row.id != patientId ? row : "";
        })
        console.log(this.usersList)
        this.adminService.deletePatient(patientName, patientId).subscribe(res => {
            this.usersList = this.usersList.filter(row => {
                return row.id != patientId ? row : "";
            })
            console.log("user" +patientId+ " was deleted")
        }, err => console.log(err));
    };

    editPatient(patientId: string) {
        console.log(patientId);
        this.selectedPatient = this.usersList.filter(row => row.id == patientId);
        console.log(this.selectedPatient);
    };

    presPat(patientId: string) {
        console.log(patientId);
        //this.checkoutForm.controls['userId'].setValue = patientId;
        this.selectedPatient = this.usersList.filter(row => row.id == patientId);;
        console.log(this.selectedPatient);
    };

    savePrescription() {
        console.log(this.prescription, this.selectedPatient);
        this.adminService.addPrescription(this.prescription, this.selectedPatient[0].id).subscribe(res => console.log(res), err => console.log(err));
    }

    createPatient() {
 //       this.adminService.createPatient
    }

}
