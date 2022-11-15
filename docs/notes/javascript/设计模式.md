---
title: 设计模式
---

# 设计模式

> 记录常用的设计模式

## Decorator（装饰器模式）

Decorator（装饰器模式）属于结构型模式，是一种拓展对象额外功能的设计模式，别名 `wrapper`。

### 样例

```typescript
// typescript code
class Component {
  // 具有点击事件
  public onClick = () => {};
}

class Decorator extends Component {
  private _component;

  constructor(component) {
    this._component = component;
  }

  public onClick = () => {
    log("打点");
    this._component.onClick();
  };
}

const component = new Component();
// 一个普通的点击
component.onClick();

const wrapperComponent = new Decorator(component);
// 一个具有打点功能的点击
wrapperComponent.onClick();
```

## Observer（观察者模式）

Observer（观察者模式）属于行为型模式。

### 样例

```typescript
// typescript code
// 观察者模式
class Subject {
  // 观察者列表
  private observers: Observer[] = [];

  // 状态
  private state: any = {};

  // 发布通知
  notify() {
    this.observers.forEach((observer: Observer) => {
      observer.update();
    });
  }

  // 添加观察者
  add(observer) {
    this.observers.push(observer);
  }

  // 更新状态
  setState(state) {
    this.state = state;
    this.notify();
  }

  getState() {
    return this.state;
  }
}

// 观察者
class Observer {
  private subject: Subject;

  constructor(subject: any) {
    this.subject = subject;
    this.subject.add(this);
  }

  update() {
    console.log(this.subject.getState());
  }
}

let subject1 = new Subject();
let observer1 = new Observer(subject1);
let observer2 = new Observer(subject1);
subject1.setState(2);
setTimeout(() => {
  subject1.setState(10);
}, 2000);
```
