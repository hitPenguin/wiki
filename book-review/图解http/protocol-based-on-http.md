# 基于 http 协议追加功能的协议

## SPDY 协议 | 以会话层的形式加入 | 控制对数据的流动

* 多路复用流 | 通过单一的 TCP 连接，无限制处理多个 HTTP 请求
* 赋予请求优先级 | 可以给 http 请求赋予优先级
* 压缩 HTTP 首部
* 支持推送功能 | 支持服务器主动推送数据
* 服务器提示功能 | 服务器可以主动提示客户端请求所需资源

## WebSocket 协议 | 全双工通信协议

* 在建立 Http 连接后，需要完成一次"握手"阶段
* 握手——请求
```
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Key:  键值 浏览器随机生成 base64编码
  Sec-WebSocket-Protocol: 记录使用的子协议 chat, superchat
  Sec-WebSocker-Version: 13
```
* 握手——响应
```
  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Accept: 键值 由 Sec-WebSocket-Key 生成
  Sec-WebSocket-Protocol: 确认使用的子协议 chat
```
* javascript 可调用 "The WebSocket API" (http://www.w3.org/TR/websockets) 内提供的 websocket 程序接口

## HTTP/2.0 

* SPDY 协议 | Google 起草
* HTTP Speed + Mobility | 微软起草 | 基于 SPDY 和 WebSocket 协议
* Network-Friendly HTTP Upgrade | 主要针对移动端

压缩 | SPDY，Friendly
-- | --
多路复用 | SPDY
TLS义务化 | Speed + Mobility
协商 | Speed + Mobility，Friendly
客户端拉拽(Client Pull)/服务器推送(Server Push) | Speed + Mobility
流量控制 | SPDY
WebSocket | Speed + Mobility

## WebDAV | Web-based Distributed Authoring and Versioning 

* 通过 Web 远程对服务器上的文件进行创建和编辑
* `拓展概念`： 
1. Collection 集合 ： 统一管理的多个资源
2. Resource 资源 ： 文件或集合
3. Property属性： 定义资源的属性。 例："文件大小：1024k"
4. Lock 锁 ： 把文件设置成无法编辑状态
* `新增的方法`:
1. PROPFIND: 获取属性
2. PROPPATCH: 修改属性
3. MKCOL: 创建集合
4. COPY: 复制资源及属性
5. MOVE: 移动资源
6. LOCK: 资源加锁
7. UNLOCK: 资源解锁
* `拓展的状态码`：
1. 102 Processing ： 可正常处理请求，但目前在处理中状态
2. 207 Multi-Status： 存在多种状态
3. 422 Unprocessible Entity： 格式正确 内容有误
4. 423 Locked： 资源已被加锁
5. 424 Failed Dependency： 
6. 507 Insufficient Storage： 保存空间不足

## http 协议火的原因

* 常用 80 和 443 端口，防火墙早已设置好，设置方便
* 等等。。。




