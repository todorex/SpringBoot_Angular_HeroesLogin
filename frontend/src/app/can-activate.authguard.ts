/**
 * 防止未登录用户访问其他页面呢，使用Auth Guard。
 * Created by rex on 2018/4/22.
 */


import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./service/authentication.service";

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      // 可以通过
      return true;
    }

    // 不能通过，跳转到登录页面
    this.router.navigate(['/login']);
    return false;
  }
}
