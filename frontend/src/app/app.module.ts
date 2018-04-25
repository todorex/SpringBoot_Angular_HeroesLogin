import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent }from './hero-detail/hero-detail.component';
import {HeroService} from "./service/hero.service";
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './service/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeroSearchComponent} from "./hero-search/hero-search.component";
import { LoginComponent } from './login/login.component';
import {CanActivateAuthGuard} from "./can-activate.authguard";
import {AuthenticationInterceptor} from "./login/authentication.interceptor";
import {AuthenticationService} from "./service/authentication.service";
import { IndexComponent } from './index/index.component';

// Angular 需要知道如何把应用程序的各个部分组合到一起，以及该应用需要哪些其它文件和库
// 有些元数据位于 @Component 装饰器中，你会把它加到组件类上。 另一些关键性的元数据位于@NgModule装饰器中。
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    LoginComponent,
    IndexComponent
  ],
  // 这里是该应用所需外部模块的列
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  // 在要求 Angular 把 HeroService 注入到 HeroesComponent 之前，你必须先把这个服务提供给依赖注入系统
  // providers 数组会告诉 Angular 创建 HeroService 的单一、共享的实例，并且把它注入到任何请求注入它的类中。
  providers: [
    HeroService,
    MessageService,
    AuthenticationService,
    CanActivateAuthGuard,
    // 很特殊
    [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
