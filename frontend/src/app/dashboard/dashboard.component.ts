import { Component, OnInit } from '@angular/core';
import {Hero} from "../model/hero";
import {HeroService} from "../service/hero.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    console.log("到getHeroes");
    this.heroService.getHeroes().subscribe(
      // 这个 getHeroes 函数把要显示的英雄的数量缩减为四个（第二、第三、第四、第五）。
      heroes => this.heroes = heroes.slice(1,5)
    )
  }


}
