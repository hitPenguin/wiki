# 深入浅出 Node.js | 第一章

* 第三遍了，是该记点名字啥的了
* 2009.5, Ryan Dahl (瑞安，达尔)发布了 node 的最初版本
* 2012.1, 掌门人变成了 npm 包管理器的作者 Isaac Z.schlueter(施吕特)
* 官方其实叫 Node
* 每一个 Node 进程构建了网络平台，所以叫 Node
* Node 特点：
  1. 异步 I/O
  2. 事件和回调函数:
  ```js
    // javascript 的 事件触发是利用的观察者模式
    class Client {
      on(event, handler) {
        this[event] = this[event] ? [...this[event], handler] : [handler];
      }
      emit(event) {
        const args = Array.prototype.slice.call(arguments, 1);
        this[event].forEach((handler) => handler(...args));
      }
    }
  ```
* 单线程的三个问题：
  1. 无法利用多核 cpu (node 多进程模型)
  2. 错误会引起应用退出，应用的健壮性问题 (master worker工作模型)
  3. 大量计算占用 cpu 导致无法继续异步调用 I/O (child_process 模块)
* Node 应用场景
  1. I/O密集型： 通过异步 I/O 模型和事件回调机制充分利用硬件资源
  2. cpu 密集型： 可通过 C/C++ 拓展 或 多进程模型来充分利用多核 cpu 资源
  3. 与遗留系统的兼容： 没问题嘛(php, java等)
  4. 分布式应用： 

# 总结

1. 对 Node 具有突出贡献的二人： Ryan dahl, isaac Z.schlueter
2. Node 特点： 异步 I/O， 基于事件的回调
3. 单线程面临的问题
4. Node 应用场景