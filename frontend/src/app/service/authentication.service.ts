import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class AuthenticationService {
  private url: string = `${environment.apiURL}/auth`;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.url,JSON.stringify({username: username, password: password}),httpOptions).pipe(
      tap(response => {
        let token = response.token;
        if (token) {
          // 存储用户名和jwt到浏览器荤菜中，保持用户登录状态和刷新页面还是带着该token去请求数据
          localStorage.setItem('currentUser',token);
        }
      }),
      catchError(err => {
        console.error(err);
        return of (false);
        }

      )
    )
  }

  // 从本地获得缓存
  getToken(): String {
    return localStorage.getItem('currentUser');
  }

  logout(): void {
    // 清空缓存，那么没有Token也就不能刷新页面了
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }


}
