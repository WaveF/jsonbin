// import jsonbin from './dist/jsonbin'

const btnRead = document.querySelector('.btnRead');
const btnUpdate = document.querySelector('.btnUpdate');
const btnDel = document.querySelector('.btnDel');
const btnCreate = document.querySelector('.btnCreate');

main();

async function main() {
    const bid = document.querySelector('#bid').value;
    const acckey = document.querySelector('#acckey').value;

    const bin = new jsonbin(bid);
    bin.accessKey = acckey;

    // 读数据
    btnRead.addEventListener('click', async e => {
        console.log('读取数据...');
        const res = await bin.read();
        console.log('已读取', res.record);
    });

    // 写数据
    btnUpdate.addEventListener('click', async e => {
        console.log('更新数据...');
        const data = { foo: 'bar' };
        const res = await bin.update(data);
        console.log('已更新', res);
    });

    // 创建仓库
    btnCreate.addEventListener('click', async e => {
        console.log('创建仓库...');
        bin.apiKey = getApiKey();
        const res = await bin.create('axure');
        console.log('已创建', res);
    });

    // 删除仓库
    btnDel.addEventListener('click', async e => {
        console.log('删除仓库...');
        bin.apiKey = getApiKey();
        const res = await bin.delete();
        console.log('已删除', res);
    });
}

function getApiKey() {
    let _apiKey = localStorage.getItem('jsonbin_apikey');
    if (!_apiKey) {
        _apiKey = prompt('请输入jsonbin的api key:', '');
        localStorage.setItem('jsonbin_apikey', _apiKey);
    }
    return _apiKey;
}

function getAccessKey() {
    let _accKey = localStorage.getItem('jsonbin_acckey');
    if (!_accKey) {
        _accKey = prompt('请输入jsonbin的access key:', '');
        localStorage.setItem('jsonbin_acckey', _accKey);
    }
    return _accKey;
}