import { Component, OnInit } from '@angular/core';
// 导入Hero类
import { Hero } from '../model/hero';
// 导入MOCK数据
// import { HEROES } from '../mockdata/mock-heroes';
// 导入HeroService
import { HeroService } from '../service/hero.service'



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
// 始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。
export class HeroesComponent implements OnInit {
  // 利用构造函数注入，很重要
  // 这个参数同时做了两件事：1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点。
  // 当 Angular 创建 HeroesComponent 时，依赖注入系统就会把这个 heroService 参数设置为 HeroService 的单例对象。
  constructor(private heroService: HeroService) { }

  // 在初始化函数中获得heros
  ngOnInit() {
    this.getHeros();
  }

  // 用json表示数据(数据类型可以不写)
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  // 等待被赋值
  heroes: Hero[];

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // 同步，就是发出一个功能调用时，在没有得到结果之前，该调用就不返回或继续执行后续操作。
  // 异步与同步相对，当一个异步过程调用发出后，调用者在没有得到结果之前，就可以继续执行后续操作。
  // 当这个调用完成后，一般通过状态、通知和回调来通知调用者。对于异步调用，调用的返回并不受调用者控制。
  // 该方法是同步的
  // 根据现实情况，HeroService.getHeroes() 必须具有某种形式的异步函数签名。
  getHeros(): void {
    // 订阅，当有值的时候就返回
    this.heroService.getHeroes().subscribe(
      // 箭头表达式（回调函数）
      heros => this.heroes = heros
    )
  }

//  添加新英雄
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    // 当指定的名字非空时，这个处理器会用这个名字创建一个类似于 Hero 的对象（只缺少 id 属性），并把它传给服务的 addHero() 方法。
    // 真的骚
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // 如果你忘了调用 subscribe()，本服务将不会把这个删除请求发送给服务器。 作为一条通用的规则，Observable 在有人订阅之前什么都不会做。
  // 一定要订阅，因为Heros对象已经订阅
  delete(hero: Hero): void {
    // 666 先从列表中删除
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
