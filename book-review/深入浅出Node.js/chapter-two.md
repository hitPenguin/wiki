# 深入浅出 Node.js | 第二章

* CommonJS 规范 | 希望 Javascript 能运行在任何地方

* CommonJS 的模块规范 与 Node 的具体实现

1. 区分模块 与 查找模块 | 区分和定位
```js
  /**
   * @1. 优先从缓存加载 | 核心模块 > 非核心模块 | 缓存的是编译和执行后的 exports 对象
   * @2. 核心模块加载 | Node 启动时被加载进了内存
   * @3. 路径模块加载 | 转换为真实路径并加载
   * @4. 自定义模块加载 | 利用 module.paths 去查找
   */
  module.paths
  /* 
    [ '/home/chenqiang/Desktop/gitbook/deep-in-easy-out/node_modules',
      '/home/chenqiang/Desktop/gitbook/node_modules',
      '/home/chenqiang/Desktop/node_modules',
      '/home/chenqiang/node_modules',
      '/home/node_modules',
      '/node_modules' ]
  */
```
2. 定位后的入口查找
```js
  // 无拓展名，会调用 fs 同步阻塞式的判断文件是否存在 | .js > .json > .node (.node 是 c/c++ 的拓展文件，通过 dlopen()方法加载最后编译生成的文件)
  // 查找不到文件会找目录 | 在目录中找 package.json | 默认 index 为默认文件名
  // 依次向上级查找
```
3. 文件加载 | require.extensions
```js
  require.extensions
  // json 文件加载
  Module._extensions['.json'] = (module, filename) => {
    const content = NativeModule.require('fs').readFileSync(filename, 'utf8');
    try {
      module.exports = JSON.parse(stringBOM(content));
    } catch (e) {
      throw e;
    }
  }
```
4. javascript 模块的编译 | 利用 vm 包
```js
  let exports = module.exports;
  (function (exports, require, module, _filename, _dirname) {
    // 执行的 js 文件
    return module.exports;
  })
```
5. c++ 模块的编译
```js
  process.dlopen() // 调用此方法完成 c/c++ 模块的编译
```
6. json 文件的编译

7. javascript 核心模块的编译

```c++
  // 内置的 js 代码都在 natives 结构体数组里
  namespace node {
    const char buffer_native = { 47, 47, .. };
    struct _native {
      const char* name;
      const char* source;
      size_t source_len;
    }
    static const struct _native natives = {
      { "node", node_active, sizeof(buffer_module) - 1 },
      ...
    }
  }
```
```js
  // 加载核心模块时：
  NativeModule._source = process.binding('natives');
  // 再加载到 NativeModule._cache 缓存中
```

8. C++ 核心模块的编译过程 | 内建模块 
  * 先通过 NODE_MODULE 宏将模块定义到 node 命名空间中，具体初始化方法为结构的 register_func 成员
  * 内建模块统一放入 node_module_list 数组
  ```js
    // 加载时直接编译进二进制文件
    get_builtin_module('os')
  ```

## C++ 拓展模块先暂时放弃。。。。

# NPM

## npm 包的推荐格式

npm 包的文件 | 用途
----------- | ---
package.json | 包描述文件
bin | 存放可执行的二进制文件
lib | 存放 javascript 代码的目录
doc | 存放文档的目录
test | 存放单元测试用例的代码

## package.json 字段

字段名 | 用途 | 备注
----- | ---- | ---
name | 包名 | 包名唯一
description | 包描述 | 无
version | 版本号 | 参考 http://semver.org/
keywords | 关键词数组 | 做分类搜索
repositories | 托管源代码的位置列表 | 依次查找
author | 包作者 | 无
bin | 命令行工具配置 | npm install package_name -g 或 npm link 都可 | 本地的话需要把命令写在 scripts 字段中使用
main | 包的入口文件 | 缺省会把 index 作为默认入口
dependencies | 所需要的依赖包 | npm install --production
devDependencide | 开发所依赖的包 | npm install --dev

## 与命令行相关

### 与 bin 字段相关

目录名 | 文件路径 | 备注
--- | --- | ---
node_modules | Node 安装目录/lib/node_modules | npm install name -g 或 npm link 都会把 npm 包放到此目录
bin | Node 安装目录/bin | `process.execPath` 可以得到， bin 字段对应的 软链接 也在此 

### AMD | CMD (异步解决模块的引入)

* AMD | 异步模块定义
```js
  // 模块需要显示的定义和显示的返回实现导出
  // 声明模块时指定所有依赖
  define(['dep1', 'dep2'], function(dep1, dep2) {
    return function () {};
  })
  // 依赖的模块是 异步加载的
```
* CMD
```js
  define(function(require, exports, module) {
    // require 动态引入依赖
    // require 加载同步模块
    // require.async 加载异步模块
  })
```