import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  login: boolean = false;
  logout: boolean = false;

  constructor(private _Router: Router) { }

  checkLocalStorage(){
    if(localStorage.getItem('userInfo')){
      this.login = false
      this.logout = true
    }else{
      this.login = true;
      this.logout = false;
    }
  }

  submitLogout(){
    localStorage.removeItem('userInfo');
    this._Router.navigate(['/login'])
    this.login = true;
    this.logout = false;
    console.log('logged out')
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

}
