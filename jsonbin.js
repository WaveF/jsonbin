class jsonbin {
    #id = '';
    #apiKey = '';
    #accessKey = '';

    constructor(id) {
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get apiKey() {
        return this.#apiKey;
    }

    set apiKey(key) {
        this.#apiKey = key;
    }

    get accessKey() {
        return this.#accessKey;
    }

    set accessKey(key) {
        this.#accessKey = key;
    }

    read() {
        const binId = this.#id;
        const binVersion = 'latest';

        return fetch(`https://api.jsonbin.io/v3/b/${binId}/${binVersion}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Key': this.#accessKey,
            }
        })
        .then(response => response.json())
        .catch(error => { console.error(error); });
    }

    update(data) {
        const binId = this.#id;

        return fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'X-Access-Key': this.#accessKey,
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => { console.error(error); });
    }

    create(_name, _private=false) {
        // if (this.#id) {
        //     return new Promise((resolve, reject) => {
        //         resolve({id:this.#id});
        //     });
        // }

        const headers = {
            'Content-Type': 'application/json',
            'X-Bin-Private': _private,
        };

        if (this.#apiKey != '') {
            headers['X-Master-Key'] = this.#apiKey;
        }  

        if (this.#accessKey != '' && this.#apiKey == '') {
            headers['X-Access-Key'] = this.#accessKey;
        }        

        if (_name) {
            headers['X-Bin-Name'] = _name;
        }

        return fetch(`https://api.jsonbin.io/v3/b`, {
            method: 'POST',
            headers,
            body: JSON.stringify({foo:'bar'})
        })
        .then(response => response.json())
        .catch(error => { console.error(error); });
    }

    delete(binId=this.#id) {
        const headers = {};

        if (this.#apiKey != '') {
            headers['X-Master-Key'] = this.#apiKey;
        }  

        if (this.#accessKey != '' && this.#apiKey == '') {
            headers['X-Access-Key'] = this.#accessKey;
        }

        return fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
            method: 'DELETE',
            headers,
        })
        .then(response => response.json())
        .catch(error => { console.error(error); });
    }
}
window.jsonbin = jsonbin;