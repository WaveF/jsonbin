# jsonbin

## 介绍
一个用于存取 jsonbin.io 数据的简易JS库

## 方法


#### 初始化

`var bin = new jsonbin('5d17788d138da81118290901');`

> 需自行要到 https://jsonbin.io 注册账号并生成 **Public** 的存储仓ID
> 免费用户，可生成无限条存储仓记录ID，每条读写限10000次



#### 上传数据

```javascript
var myData = {user:'wavef'}; /* 你的数据 */

bin.update(myData, data=>{
    console.log('写入成功', data);
});
```



#### 下载数据

```javascript
bin.read(data=>{
    console.log('读取成功', data);
});
```



#### 更新数据

```javascript
bin.read(data=>{
    data.user = 'rain'; /* 改写数据 */
    bin.update(data, newData=>{
        console.log('更新成功', newData);
    });
});
```

> 注： 其实就是先读取数据，改写后再上传
