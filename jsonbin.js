(function(){

    var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;

    main();

    function main() {
        if (!window.$ && !window.jQuery) {
            var js = document.createElement('script');
            js.type = 'text/javascript';
            js.onload = inited;
            js.src = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js';
            HEAD.appendChild(js);
        } else {
            inited();
        }
    }

    function inited() {
        window.jsonbin = window.JSONBIN = jsonbin;

        // var bin = new jsonbin('5d17788d138da81118290901');
        
        // Load data from cloud
        // bin.read(data=>{
        //     console.log(data);
        // });

        // Update data to cloud
        // bin.update({user:'wavef'}, ()=>{
        //     bin.read(data=>{
        //         console.log(data);
        //     });
        // });
    }

    function jsonbin (binID) {
        var host = 'https://api.jsonbin.io';
        var binURL = `${host}/b/${binID}`;

        console.log(`%cVisit ${host} generate your own record id for free.`, 'background:#cbe7fe;');
        
        if(binID.length > 30) {
            var apikey = binID;
            create(data=>{
                console.log(data);
            }, apikey);
            return;
        } else if(!binID) {
            alert('Need to provide jsonbin record id.');
            return;
        }
        
        this.id = binID;

        this.setBinId = function(id) {
            this.id = id;
        }.bind(this);

        this.update = function(usrData, callback) {
            $.ajax({
                url: binURL,
                data: JSON.stringify(usrData),
                type: 'PUT',
                // beforeSend: function (req) {
                //     req.setRequestHeader("secret-key", API_KEY);
                // },
                contentType:"application/json; charset=utf-8",
                dataType: 'json',
                success: callback
            });
        }

        this.read = function(callback) {
            $.ajax({
                url: binURL + '/latest',
                // beforeSend: function (req) {
                //     req.setRequestHeader("secret-key", API_KEY);
                // },
                success: callback
            });
        };

        this.create = function(callback, API_KEY) {
            $.ajax({
                url: `${host}/b`,
                data: JSON.stringify({jsonbin:'created'}),
                type: 'POST',
                beforeSend: function (req) {
                    req.setRequestHeader("secret-key", API_KEY);
                },
                contentType:"application/json; charset=utf-8",
                dataType: 'json',
                success: data=>{
                    callback(data);
                    
                }
            });
        }

        this.del = function() {

        };

        this.info = function() {
            return {
                host: host,
                id:   binID,
                url:  binURL,
                version: 'v1.0.0'
            }
        }

        return {
            create: this.create,
            update: this.update,
            read:   this.read,
            del:    this.del,
            info:   this.info
        };
    }

}());