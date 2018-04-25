import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {LoginComponent} from "./login/login.component";
import {CanActivateAuthGuard} from "./can-activate.authguard";

// 变量要定义在前面，非常重要
const routes: Routes = [
  // 添加默认路由
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'heroes', component: HeroesComponent, canActivate: [CanActivateAuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateAuthGuard] },
  // path 中的冒号（:）表示 :id 是一个占位符，它表示某个特定英雄的 id。
  { path: 'detail/:id', component: HeroDetailComponent, canActivate: [CanActivateAuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    // 你必须首先初始化路由器，并让它开始监听浏览器中的地址变化。
    // 把 RouterModule 添加到 @NgModule.imports 数组中，并用 routes 来配置它。
    // 你只要调用 imports 数组中的 RouterModule.forRoot() 函数就行了。
    // 这个方法之所以叫 forRoot()，是因为你要在应用的顶级配置这个路由器。
    // forRoot() 方法会提供路由所需的服务提供商和指令，还会基于浏览器的当前 URL 执行首次导航。
    RouterModule.forRoot(routes)
  ],
  // 添加一个 @NgModule.exports 数组，其中放上 RouterModule 。
  // 导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。
  exports: [
    RouterModule
  ],
  // 你通常不会在路由模块中声明组件，所以可以删除 @NgModule.declarations 并删除对 CommonModule 的引用。
  declarations: []
})


export class AppRoutingModule { }



