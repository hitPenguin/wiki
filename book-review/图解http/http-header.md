# Http 首部

## End-to-end 首部 和 Hop-by-hop 首部

* 端到端首部(End-to-end Header)

```
  简单来讲，这类首部会一直被转发给最终接收目标
```

* 逐跳首部(Hop-by-hop Header)

```
  简单来讲，只对单次转发有效，包括以下协议
```
>* Connection
>* Keep-Alive
>* Proxy-Authenticate
>* Proxy-Authorization
>* Trailer
>* TE
>* Transfer-Encoding
>* Upgrade

## 通用首部字段

1. cache-control | 可以控制缓存的行为

```
  http/1.1中的 cache-control:no-cache 对应 以前版本的 pragma: no-cache
```

指令 | 参数 | 说明
--- | --- | ---
public/private | 无 | 是否对固定的用户提供缓存
no-cache | 响应头可以有location | 缓存会向源服务器进行有效期确认后在处理资源 
no-store | 无 | 不能进行缓存
max-age | 单位：秒 | 过期缓存被删除 (注意与 Expires 的共同使用)
以下 | 不太 | 常用 
only-if-cached | 无 | 我只要缓存，没缓存返回 504
must-revalidate | 无 | 过期必须重新验证
proxy-revalidate | 无 | 用户代理的缓存过期要重新验证
no-transform | 无 | 告知缓存不要改变实体主体的媒体类型

2. Connection | 控制不再转发给代理的首部字段和管理持久连接

* 控制不再转发的首部字段

``` 
  Connection： 不再转发的首部字段名
```

* 管理持久连接

```
  # http/1.0 客户端要携带此字段 | http/1.1 不需要
  Connection: Keep-Alive  /* 保持长连接 */
  Connection: close       /* 服务器明确要关闭连接 */
```

3. Date 字段

* http/1.1 使用的时间格式: `Date: Tue, 03 Jul 2012 04:40:59 GMT`
* 之前的格式： `Date: Tue, 03-Jul-12 04:40:59 GMT`
* 其他格式： `Date: Tue Jul 03 04:40:59 2012`

4. Trailer 字段 | 与分块传输编码有关

5. Transfer-Encoding 字段 | chunked 分块传输

6. Upgrade 字段

```
  检测 HTTP 协议或其他协议是否可以使用更高的版本进行通信
  例子：
    GET /index.html HTTP/1.1
    Connection: Upgrade
    Upgrade: TLS/1.0
  带有 Upgrade 字段的请求，服务器可回应 101 Switching Protocols
```

7. Via 字段 | 用于跟踪传输路径

* 经过的代理服务器将服务器信息附加到 Via 字段

```
  GET / HTTP/1.1
  Via: 1.0 gw.hackr.jp(Squid/3.1)
       1.1 a1.example.com(Squid/3.1)
  常和 TRACE 方法一起用
```

8. Warning 字段 | 一般是关于缓存相关问题的警告

## 请求首部字段

1. Accept 字段 | 用户代理能处理的媒体类型以及优先级

* 文本文件
```
  text/html, text/plain, text/css ...
  application/xhtml+xml, application/xml ...
```
* 图片文件
```
  image/jpeg, image/gif, image/png ...
```
* 视频文件
```
  video/mpeg, video/quicktime ...
```
* 应用程序使用的二进制文件
```
  application/octet-stream, application/zip ...
```
* 优先级
```
  q 表示额外权重，用分号(;)分割，权重值为(0 ~ 1), 默认为 1
  Accept: text/html,application/xml;q=0.9,*/*;q=0.8
```

2. Accept-Charset | 指定可以处理的字符集及优先级 | 与上相同

3. Accept-Encoding | 指定可以处理的编码格式及优先级

* gzip
```
  由程序 gzip(GNU zip)生成的编码格式(RFC1952),采用 Lempel-Ziv 算法(LZ77) 及 32 位循环冗余校验(Cyclic Redundancy Check, 统称 CRC)
```

4. Accept-language | 指定可以处理的自然语言集及权重

5. Authorization | 用户代理的认证信息

* Basic 认证

6. Expect

```
  Expect： 100-continue
  客户端可以写入自己期待的特定行为，服务器无法理解会返回 417 Expectation Failed
```

7. From 字段 | 告知服务器用户的电子邮箱地址

8. Host 字段 | HTTP/1.1 规范内唯一必须包含在请求头中的字段

* Host 字段对于相同 IP 下部署多个域名有很大帮助

9. If-Match 字段 

* If-Match 
```
  If-Match 会匹配 ETag
  两者一致才会处理请求 否则返回 412 Precondition Failed
```
* If-Modified-Since | 对应服务器的 Last-Modified
```
  指定日期后自愿发生了更新，服务器才会接受请求，否则 304 Not Modified
```
* If-None-Match
```
  与 ETag 不匹配时，服务器才接受请求，通常和 If-Modified-Since 搭配使用处理缓存
```
* If-Range
```
  会与 ETag 或时间进行匹配，一致则作为范围请求处理，否则返回全体资源
```
* If-Unmodified-Since
```
  作用与 If-Modified-Since 相反，若有更新也会返回 412 Precondition Failed
```

10. Max-Forwards 字段 

```
  通过 TRACE 方法和 OPTIONS 方法，发送包含 Max-Forwards 的请求，可以以十进制整数的形式指定可经过的服务器最大数目，转发一次 Max-Forwards 的值减 1，为 0 时返回响应
  Max-Forwards：9 
  Max-Foewards：0  ---> 则返回响应
```

11. Proxy-Authorization 字段

* 用于客户端和代理服务器之间的访问认证 | 服务器和客户端之间可以用 Authorization 字段
```
  Proxy-Authorization: Basic dGlwOjkpNLAGfFY5
```

12. Range 字段 | 范围请求

```
  Range： bytes=5001-10000
  若成功处理，返回 206 Partical Content，无法处理则返回 200 OK 以及全部资源
```

13. Referer 字段 | 告知服务器请求的原始资源的 URI

* 即当前请求的来源 url ：比如百度上点击网址跳转，Referer 即为 www.baidu.com

14. TE | 类似 Accept-Encoding，但用于传输编码(Transport Encoding)

15. User-Agent 字段 | 用户代理的信息

## 响应首部字段

1. Accept-Ranges 字段

```
  Accept-Ranges: bytes 可以接收范围请求
  Accept-Ranges: none 不可以
```

2. Age 字段 

```
  若发出者是缓存服务器： 缓存后的响应再次发起认证到认证完成的时间
  若发出者是源服务器： 源服务器在多久前创建了响应
```

3. ETag 字段

* 强 ETag 值
```
  实体发生多细微的变化都会改变
  ETag: "usagi-1234"
```
* 弱 ETag 值
```
  ETag: W/"usagi-1234"
```

4. Location 字段

* Location 基本会配合 3xx : Redirection 的响应,提供重定向的 URI

5. Proxy-Authenticate 字段 | 对应客户端与服务器端的 WWW-Authorization 字段

```
  此字段会把由代理服务器所要求的认证信息发给客户端
  Proxy-Authenticate: Basic realm="Usagidesign Auth"
```

6. Retry-After 字段

```
  Retry-After: 120 
  字段一般配合 503 Service Unavailable，或 3XX Redirect 响应一起使用
  字段值可以是具体的日期或者创建响应后的秒数
```

7. Server 字段

```
  服务器安装的 Http 服务器应用程序的信息等
  Server: Apache/2.2.17 (Unix) PHP/5.2.5
```

8. Vary 字段

```
  Vary: Accept-Language
  若源服务器响应中包含 vary 字段，则之后代理服务器收到请求中只对有相同的首部字段的请求返回缓存
```

9. WWW-Authenticate 字段

```
  WWW-Authenticate: Basic realm="Usagidesign Auth"
  用于 HTTP 认证，会告知客户端服务器端的认证方案和带参数提示的质询
```

## 实体首部字段 | 与实体部分相关的字段

1. Allow 字段

```
  Allow：get post
  服务器收到不支持的 http 请求时，会返回 405 Method Not Allowed，还会返回 Allow 字段
```

2. Content-Encoding 字段 | 实体内容编码格式

```
  主要采用 4 种编码格式：
    gzip  
    compress
    deflate
    identity
```

3. Content-language 字段 | 实体主体使用的自然语言

4. Content-length 字段

5. Content-Location 字段 | 返回主体资源所对应的 URI

6. Content-MD5 字段

```
  对报文主体执行 MD5 算法获得的 128 位二进制，再通过base64 编码后写入 Content-MD5 字段，用于确认报文的完整性
```

7. Content-Range 字段

```
  针对范围请求，返回的首部字段
  Content-Range： bytes 5001-10000/10000
```

8. Content-Type 字段

```
  说明实体对象的媒体类型
  Content-Type： text/html; charset=UTF-8
```

9. Expires 字段

```
  缓存的过期事件，优先级低于 Cache-Control: max-age=xxx
  Expires: Wed, 04 Jul 2012 08:26:05 GMT
```

10. Last-Modified 字段

## 为 Cookie 服务的首部字段

* set-cookie
* cookie

## 其他首部字段 | 自定义，非标准

1. X-Frame-Options 字段

```
  用于控制网站内容在其他 Web 网站的 Frame 标签内的显示问题
  可选值： 
    DENY 拒绝
    SAMEORIGIN 仅同源域名下的页面匹配时许可
```

2. X-XSS-Protection 字段

```
  针对跨站脚本攻击
  X-XSS-Protection: 0 或者(1)
  0 无效 | 1 有效
```

3. DNT 字段 | 需要 web 服务器支持

```
  DNT === Do Not Track 意为拒绝个人信息被追踪
  DNT： 0 （1）
  0 同意被追踪 | 1 拒绝被追踪
```

4. P3P 字段 | 省略 | 对隐私保护

5. X- 前缀 字段 | 非标准的自定义字段

