import { Component, OnInit } from '@angular/core';
import { DoctorsaService } from '../../Services/doctorsa.service';

interface UserOne {
    name: string;
    role: string;
    id: string;
    prescription: string;
}

@Component({
  selector: 'app-care-taker',
  templateUrl: './care-taker.component.html',
  styleUrls: ['./care-taker.component.css']
})
export class CareTakerComponent implements OnInit {

    public usersList: UserOne[] = new Array<UserOne>();
    public usersList1: UserOne[] = new Array<UserOne>();

    private usersList2: UserOne[] = [
        {
            id: "21321", name: "aaaaa", role: "patient", prescription: "some prescription hardcoded",
        },
        {
            id: "21322", name: "bbbbb", role: "patient", prescription: "some prescription hardcoded"
        },
        {
            id: "21323", name: "cccc", role: "patient", prescription: "some prescription hardcoded"
        },
        {
            id: "21324", name: "dddd", role: "patient", prescription: "some prescription hardcoded"
        },
        {
            id: "21325", name: "eeeee", role: "patient", prescription: "some prescription hardcoded"
        }
    ]
    constructor(private adminService: DoctorsaService) { }

    ngOnInit() {
        this.adminService.getAllPatients().subscribe((res: any[]) => {
            console.log(res);
            res.forEach((row: any) => {
                let copy: UserOne = { id: row.id, name: row.email, role: 'patient', prescription: row.prescription}
                this.usersList1.push(copy);
                console.log(this.usersList);
            });
            this.usersList = this.usersList1.concat(this.usersList2);
        }, err => {
            console.warn(err);
        });
  }

}
