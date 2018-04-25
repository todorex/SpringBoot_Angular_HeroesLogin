import { Component, OnInit } from '@angular/core';
import {MessageService} from "../service/message.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // User model
  model: any = {};
  loading: boolean = false;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // 重置登录状态
    this.authenticationService.logout();
  }

  login() {
    this.loading = false;
    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      result => {
        if (result) {
          // 登录成功
          // this.router.navigater(['dashboard']);
          this.router.navigate(['dashboard']);
        } else {
          this.log('Username or Password is incorrect');
          this.loading = false
        }
      }
    )
  }


  private log(message: string) {
    this.messageService.add('Login: ' + message);
  }

}
