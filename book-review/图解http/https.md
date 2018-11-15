# HTTPS 协议

## HTTP 缺点

* 通信使用明文，内容可能被窃听 | 对应 `加密`
* 不验证通信方的身份，可能进行伪装 | 对应 `认证`
* 无法验证报文的完整性，有可能已被篡改 | 对应 `完整性保护`

## HTTP + 加密 + 认证 + 完整性保护 = HTTPS

* HTTP | HYPER TEXT TRANSPORT PROTOCOL | 超文本传输协议
* SSL | Secure Socket Layer | 安全套接层
* TLS | Transport Layer Security | 安全层传世协议
* HTTPS | HTTP Secure | 超文本传输安全协议

### 加密

* 通信协议加密 | ssl/tls
* 内容本身加密 | 对实体主体进行加密

### 认证

* 查明对手的证书

### 完整性保护

* ssl 提供认证和加密处理及摘要功能

### 公开密钥加密 | 非对称密钥 

* 私有密钥 | private key
* 公开密钥 | public key

### 共享密钥加密 | 对称加密

* 密钥 | key

## https 的建立

### HTTPS 采用混合加密机制

* 交换密钥环节使用公开密钥加密
* 通信交换报文阶段用共享密钥加密

### 确认公钥来自源服务器 | CA 

* 数字证书认证机构来自第三方 | 根证书植入浏览器 | 根证书即是 CA 的公开密钥
* CA用私钥对服务器上传的公钥进行数字签名 | 即数字证书包含 CA 私钥加密的服务器公钥

## HTTPS 通信

### 按步骤：

#### 建立连接

1. 客户端发送 Client Hello，报文中包含客户端支持的 SSL 的指定版本，加密组件列表(所使用的加密算法和密钥长度)
2. 服务器回应 Server Hello，报文中包含筛选后的 SSL 版本及加密组件
3. 服务器发送 Certificate 报文，报文中包含公开密钥证书
4. 服务器发送 Server Hello Done，最初阶段的 SSL 握手结束
5. 客户端回应 Client Key Exchange 报文，报文中包含 Pre-master secret 随机密码串，报文已经过公钥加密
6. 客户端发送 Change Cipher Spec 报文，报文提示服务器之后通信采用 Pre-master secret 密钥加密
7. 客户端发送 Finished 报文。
8. 服务器发送 Change Cipher Spec 报文
9. 服务器发送 Finished 报文
10. 开始进行 http 通信 

#### 断开连接

1. 客户端发送 close_notify 报文。
2. 客户端发送 TCP FIN

### MAC | Message Authentication Code | 报文摘要 | 确认报文是否被篡改

