import { Injectable } from '@angular/core';
import { Hero } from '../model/hero';
import { Observable} from 'rxjs';
import {of} from "rxjs/observable/of";
import { MessageService } from './message.service';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

// const常量不是类中定义的
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' }),
};


// @Injectable() 装饰器告诉 Angular 这个服务本身可能拥有被注入的依赖。

@Injectable()
export class HeroService {

  // 把服务器上英雄数据资源的访问地址定义为 heroesURL。
  private heroesUrl = `${environment.apiURL}/api/heroes`;


  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // 利用了观察者模式
  getHeroes(): Observable<Hero[]> {
    // 获取到英雄数组时发送一条消息。
    this.messageService.add('HeroService: fetched heroes');

    // of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组。
    // return of(HEROES);

    // 所有的 HttpClient 方法都会返回某个值的 RxJS Observable，很重要
    // Observable 可以在一段时间内返回多个值。 但来自 HttpClient 的 Observable 总是发出一个值，然后结束，再也不会发出其它值。
    // HttpClient.get 默认情况下把响应体当做无类型的 JSON 对象进行返回。 如果指定了可选的模板类型 <Hero[]>，就会给返回你一个类型化的对象。
    // 其它 API 可能在返回对象中深埋着你想要的数据。 你可能要借助 RxJS 的 map 操作符对 Observable 的结果进行处理，以便把这些数据挖掘出来。
    // 要捕获错误，你就要使用 RxJS 的 catchError() 操作符来建立对 Observable 结果的处理管道（pipe）。
    // catchError() 操作符会拦截失败的 Observable。 它把错误对象传给错误处理器，错误处理器会处理这个错误。
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      // HeroService 的方法将会窥探 Observable 的数据流，并通过 log() 函数往页面底部发送一条消息。
      // 它们可以使用 RxJS 的 tap 操作符来实现，该操作符会查看 Observable 中的值，使用那些值做一些事情，并且把它们传出来。 这种 tap 回调不会改变这些值本身。
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    // 反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // 现在JS真的是无敌
    // return of(HEROES.find(hero => hero.id === id))
    // JS的模板字符串字面量
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

  }

  // 用作日志使用
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  // 错误处理函数
  // 下面这个 errorHandler() 将会在很多 HeroService 的方法之间共享，所以要把它通用化，以支持这些彼此不同的需求。

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // 修改英雄
  updateHero(hero: Hero) {
    return this.http.put(this.heroesUrl,hero,httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  // HeroService.addHero() 和 updateHero 有两点不同。

  // 它调用 HttpClient.post() 而不是 put()。

  // 它期待服务器为这个新的英雄生成一个 id，然后把它通过 Observable<Hero> 返回给调用者。

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero) {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    // URL 就是英雄的资源 URL 加上要删除的英雄的 id。

    // 你不用像 put 和 post 中那样发送任何数据。很重要

    // 你仍要发送 httpOptions。
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  // 404页面
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
}
