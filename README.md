# jsonbin

## 介绍
一个用于存取 jsonbin.io 数据的简易JS库

## 方法


#### 初始化

`const bin = new jsonbin('64a598039d312622a37ab8a2');`

> 可以到 https://json.minicg.com 获取json仓库
> 也可自行要到 https://jsonbin.io 注册账号并生成 **公开** 的存储仓ID
> 免费用户，可生成无限条存储仓记录ID，每个仓库读写限10000次


#### 读取数据

```js
// 读取仓库最新的数据
bin.read();
```

#### 更新数据

```js
// 将新数据写入仓库
bin.update({foo:'bar'});
```


#### 创建仓库

```js
// 生成一个新的仓库，并返回仓库id，后续可以用这个id进行操作
bin.create('name');
```

#### 删除仓库

```js
// 删除仓库
bin.delete();
```

#### 设置API-KEY

```js
// 设置API-KEY，用于操作你名下的所有仓库
bin.apiKey = '';
```


#### 设置ACCESS-KEY

```js
// 设置ACCESS-KEY，用于操作特定的私有仓库
bin.accessKey = '';
```

