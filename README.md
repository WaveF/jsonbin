# jsonbin

## 介绍
一个用于存取 jsonbin.io 数据的简易JS库

## 方法


#### 初始化

`const bin = new jsonbin('64a598039d312622a37ab8a2');`

> 可以
> 也可自行要到 https://jsonbin.io 注册账号并生成 **公开** 的存储仓ID
> 免费用户，可生成无限条存储仓记录ID，每个仓库读写限10000次


#### 读取数据

```js
bin.read();
```

#### 更新数据

```js
bin.update({foo:'bar'});
```


#### 创建仓库

```js
bin.create('name', false);
```

#### 删除仓库

```js
bin.delete();
```

#### 设置API-KEY

```js
bin.apiKey = '';
```


#### 设置ACCESS-KEY

```js
bin.accessKey = '';
```

