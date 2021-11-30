import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'priv-attic-front';

  private screenWidth: number;

  constructor(private _authService : AuthService, private _router: Router) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    if (!this.isLogged()) this._router.navigate(['explore']);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  isMobile(){
    return this.screenWidth <= 600;
  }

  isLogged():boolean{
    return this._authService.isLogged();
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['explore']);
  }
}
