# 确认访问用户身份的认证

## HTTP使用的认证方式 

### BASIC认证 | 从 http/1.0 开始 | 存在非加密，无法注销等问题

1. 若请求的资源需要 BASIC 认证时，服务器返回401 和 WWW-Authenticate 首部字段
```
  WWW-Authenticate: BASIC realm="Input Your ID and Password"
```
2. 客户端收到 401， 将账号密码以冒号(:)连接，再经过 base64 编码处理，再次请求带上 Authenticate 字段
```
  account:password ===> YWNjb3VudDpwYXNzd29yZA==
  Authorization: YWNjb3VudDpwYXNzd29yZA==
```
3. 服务器端接收并验证后，返回 request URI

### DIGEST 认证 | 从 http/1.1 开始 | response 会对各个首部添加认证

1. 若请求的资源需要 DIGEST 验证,服务器返回401 和 WWW-Authenticate 首部字段，并发送临时的质询码(随机数，nonce)
```
  必须包含 realm 和 nonce 两个字段
  WWW-Authenticate: Digest realm="DIGEST",nonce="(通常是由 base64 编码的十六进制的数组形式)",algorithm=MD5,qop="auth"
```

2. 客户端收到 401， 返回 Authenticate 字段
```
  必须包含 username 和 realm 和 nonce 和 uri 和 response
  Authenticate: Digest username="guest",realm="DIGEST",nonce="同响应",uri="/digest",algorithm=MD5,response="xxxxxxxxxx",qop="auth",nc=00000001,cnonce="xxxxx"
  客户端新增的部分:
    cnonce: 客户端生成的 GUID
    nc: 认证的次数 (固定的八个字节，且不加引号)
    response: 根据以上信息再加上密码通过一定顺序计算出的一个 md5 
```

3. 认证成功，返回状态码 200 和首部字段 Authenticate-Info
```
  Authenticate-Info: cnonce="xxxxxx", nc=00000001,qop=auth
```

### SSL 客户端认证 | 客户端证书认证

* 事先把客户端证书发给客户端，并且客户端已安装证书 | 证书应该是用服务器的私钥签名
1. 接受请求时，服务器发送 Certificate Request 报文
2. 客户端发送 Client Certificate 报文
3. 服务器领取客户端证书中的公开密钥，然后开始 https 加密通信

### 基于表单认证 | 认证多半基于表单认证

* 一般是用 cookie 来管理 session

1. 客户端把 账号密码 放入报文的实体部分，使用 https 进行通信
2. 服务器进行认证并 将登录状态与 Session ID 绑定，并把 Session ID 以 Cookie 形式发给客户端
3. 客户端再次请求时带上 Cookie

### 服务器密码保存 | 先 salt 再 hash

1. 给密码加盐(salt)
```
  salt 由服务器随机生成的一个字符串，保证长度够长且真正随机，然后和密码相连接。
```
2. 使用散列(hash)函数计算出 散列值 保存
