import { Component, OnInit,Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// 导入Hero类
import { Hero } from '../model/hero';
import {HeroService} from "../service/hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // hero 属性必须是一个带有 @Input() 装饰器的输入属性，因为外部的 HeroesComponent 组件将会绑定到它。很重要
  @Input() hero: Hero;

  constructor(// ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。
              // 这个组件对从 URL 中提取的路由参数感兴趣。 其中的 id 参数就是要现实的英雄的 id。
              private route: ActivatedRoute,
              // HeroService 从远端服务器获取英雄数据，本组件将使用它来获取要显示的英雄。
              private heroService: HeroService,
              // location 是一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图。
              private location: Location) {
  }

  ngOnInit() {
    this.getHero();
  }

  // 由id获取英雄
  getHero(): void {
    // route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。
    // paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的英雄的 id。
    // 路由参数总会是字符串。 JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。
    const id = +this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id).subscribe(
      hero => this.hero = hero
    );

  }

  // 把一个后退按钮添加到组件模板的底部，并且把它绑定到组件的 goBack() 方法。
  goBack(): void {
    // 利用你以前注入的 Location 服务在浏览器的历史栈中后退一步。
    this.location.back();
  }

  // 修改英雄
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(
      () => this.goBack()
    )
  }

}
