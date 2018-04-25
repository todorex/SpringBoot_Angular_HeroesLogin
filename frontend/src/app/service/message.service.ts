import { Injectable } from '@angular/core';

// 该服务对外暴露了它的 messages 缓存，以及两个方法：add() 方法往缓存中添加一条消息，clear() 方法用于清空缓存。
@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor() { }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }



}
