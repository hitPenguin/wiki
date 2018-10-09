# Internet因特网

因特网服务提供商（Internet Service Provider, ISP）

* 端系统通过ISP接入因特网
* 组成
  * 多个分组交换机
  * 多段通信链路
* 提供接入方式
  * 线缆调制解调器、DSL
  * 高速局域网接入
  * 无线接入
  * 56kbps拨号调制解调器
* 为内容提供者提供接入服务
* ISP之间也要互联
* 底层的ISP通过国家的国际的高层ISP互联

协议protocol

* 控制着因特网中的信息的接收和发送
* TCP, Transmission Control Protocol
* IP, Internet Protocol 定义了分组格式

Internet Standard
Internet Engineering Task Force, IETF
Request For Comment, RFC
定义了TCP、IP、

服务描述
分布式应用程序 distributed application

端系统向程序提供一个应用程序编程接口Application Programming Interface，该API规定了运行在端系统上的软件请求因特网基础设施向运行在另一个端系统上的特定目的地软件交付数据的方式。

类比：通过邮局寄信

协议
定义了在两个或多个通信实体之间交换的报文格式和次序，以及报文发送或接收一条报文或其他事件所采取的动作。


* 网络边缘（主机、端系统、客户端、服务器）
* 接入网access network 指将端系统连接到其边缘路由器edge router的物理链路
  * 家庭接入
    * 数字用户线（Digital Subscriber Line, DSL）电话
    * 电缆
    * FTTH（Fiber To The Home 光纤到户）
    * 拨号
    * 卫星
  * 企业接入
    * 以太网
    * WiFi
  * 广域无线接入
    * 3G
    * LTE, Long-Term Evolution
  * 物理媒介 physical medium
    * 双绞铜线
    * 同轴电缆
    * 多模光纤缆
    * 陆地无线电频谱
    * 卫星无线电频谱
  * 物理媒介分类
    * 引导型媒体 guided media
    * 非引导型媒体 unguided media
* 网络核心
  * 分组交换
    * 存储转发传输
    * 排队时延 分组丢失（丢包）
    * 转发表和路由选择协议
  * 电路交换
    * 电话（端对端建立连接）
    * 复用：频分复用、时分复用
