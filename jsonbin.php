<?php

session_start();

$binName = $_SERVER['REMOTE_ADDR'];
$apiKey = '';
$collectionId = '615d4ae0aa02be1d4454f2a8';
$timer = 60;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $lastRequestTime = isset($_SESSION['last_request_time']) ? $_SESSION['last_request_time'] : 0;
    $currentTime = time();

    if ($currentTime - $lastRequestTime < $timer) {
        echo 'wait'; // 时间间隔小于N秒，返回错误信息
        exit;
    }

    $_SESSION['last_request_time'] = $currentTime;

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    
    curl_setopt($ch, CURLOPT_URL, 'https://api.jsonbin.io/v3/b');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['foo' => 'bar']));

    $headers = [
      'Content-Type: application/json',
      'X-Bin-Private: false',
      'X-Master-Key: ' . $apiKey,
      'X-Bin-Name: ' . $binName,
      'X-Collection-Id: ' . $collectionId
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
      echo 'Error: ' . curl_error($ch);
    }

    curl_close($ch);

    // 解码 JSON 数据为 PHP 对象
    $data = json_decode($response);

    // 提取 id 值
    $id = $data->metadata->id;

    echo $id;
    exit; // 结束脚本，不再执行以下 HTML 部分
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>JSON仓库</title>
  <meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  <link rel="stylesheet" href="https://ax.minicg.com/milligram.min.css">
  <style>
    * { font-size:14px; font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; }
    html,body { height:100%; }
    body { display:flex; justify-content:center; align-items:center; background: linear-gradient(180deg, #fff, #f0f2f7); margin:0; }
    input { color: rgba(0,0,0,.65); text-align:center; font-family:monospace; }
    button { background-color: #774dca; transition:.3s; }
    button:hover { background-color: #774dca; filter:brightness(1.2); }
    button:active { filter:brightness(.8); }
    #result { background-color:#fff; transition:.3s; }
    h2 { font-size:48px; }
    .container { display:flex; flex-direction:column; gap:10px; width:520px; text-align:center; margin-top:-100px; }
    .field { display:flex; gap:10px; }
    .footer{position:fixed;width:100%;bottom:0;padding:10px 0 20px;font-size:0;font-weight:400;text-align:center;}
    .footer span{display:inline-block;color:#AAA;transition:color .3s;}
    .footer span a {font-size:13px;}
    .footer span:hover{color:#333;}
    .footer span::after{content:'|';padding:0 20px;color:#CCC;}
    .footer span:last-child{margin:0;}
    .footer span:last-child::after{display:none;}
    .lds-dual-ring { display:none; position:absolute; top:50%; left:50%; width:80px; height:80px; transform:translate(-50%,-50%) scale(.5); background:#7433f3; box-shadow:0 0 20px #7433f3; border-radius:50%; }
    .lds-dual-ring:after { content:" "; display:block; width:60px; height:60px; margin:10px; border-radius:50%; border:5px solid #fff; border-color:#fff transparent #fff transparent; animation:lds-dual-ring 1.2s linear infinite; }
    @keyframes lds-dual-ring { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="container">
    <h2>JSON仓库</h2>
    <div class="field">
      <input type="text" id="result" placeholder="获取您的JSON仓库" readonly>
      <button id="btnGetBin">生成</button>
    </div>
    <script async src="//jsrun.net/stFKp/embed/js,result/light"></script>
  </div>
  <div class="footer">
    <span>wechat: miniCG</span>
    <span>qq: 298010927</span>
    <span>email: wavef@minicg.com</span>
    <span>website: minicg.com</span>
    <span><a href="https://beian.miit.gov.cn/">粤ICP备17082571号</a><div id="extwaiokist" style="display:none" v="gigpo" q="756eaf9a" c="843.4" i="851" u="104.5" s="06182305" sg="svr_04262315-ga_06182305-bai_06162323" d="1" w="false" e="" a="2" m="BMe=" vn="9sebu"><div id="extwaigglbit" style="display:none" v="gigpo" q="756eaf9a" c="843.4" i="851" u="104.5" s="06182305" sg="svr_04262315-ga_06182305-bai_06162323" d="1" w="false" e="" a="2" m="BMe="></div></div></span>
  </div>
  <div id="loading" class="lds-dual-ring"></div>

  <script src="https://ax.minicg.com/toastify.min.js"></script>
  <script>
    (function(){
      const loading = document.querySelector('#loading');
      const inputBox = document.querySelector('#result');
      const btnGetBin = document.querySelector('#btnGetBin');
      
      btnGetBin.addEventListener('click', getBin);
      inputBox.addEventListener('click', ()=>{
        if (inputBox.value == '') return;
      	navigator.clipboard.writeText(inputBox.value).then(() => {
          toast(`仓库ID已复制到剪贴板`, '#09f');
        }).catch(err => {
          console.error('复制到剪贴板时出错:', err);
        });
      });
      
      async function getBin() {
        loading.style.display = 'block';
      	fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          if (data == 'wait') {
            toast(`请勿频繁获取, 1分钟后可再次生成`, '#F63434');
          } else {
            toast(`您的JSON仓库序号已生成`, '#00AB0B');
            inputBox.value = data;
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(()=>{
          loading.style.display = 'none';
        });
      }

      function toast(msg, color='rgba(0,0,0,.9)') {
        Toastify({
          text: msg,
          gravity: 'bottom',
          position: 'center',
          duration: 3000,
          style: {background: color},
        }).showToast();
      }
    }());
  </script>
</body>
</html>
