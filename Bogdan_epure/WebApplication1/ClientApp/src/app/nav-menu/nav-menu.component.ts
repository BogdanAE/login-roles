import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { BehaviorSubject } from 'rxjs';
import { DoctorsaService } from '../Services/doctorsa.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    public userEmail: any;
    public userRole: string;
    public $isUserAuthenticated: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

    constructor(private authService: AuthorizeService, private roleService: DoctorsaService, private authorizeService: AuthorizeService) {
        this.authService.isAuthenticated().subscribe(res => this.$isUserAuthenticated.next(res));
        console.warn(this.$isUserAuthenticated);
    }

    ngOnInit() {
        this.authorizeService.getUser().pipe(map(u => u && u.name)).subscribe(res => {
            this.userEmail = res;
            if (res && !this.userRole) {
                this.roleService.getUserRole(res)
                    .subscribe(role => { this.userRole = role[0]; console.log(this.userRole) }, err => console.log(err))
            }
        }, err => console.log(err));
    }

    isExpanded = false;

    get isUserAuthenthicated() {
        return this.$isUserAuthenticated.value ? true : false;  
    }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    }

    ngOnDestroy() {
        if(this.$isUserAuthenticated)
          this.$isUserAuthenticated.unsubscribe();
    }
}
