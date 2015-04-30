/**
 var store = new Store();
 store.put('http://google.com');
 store.get('http://google.com'); // returns true

 this.parse('http://google.com/1/2/3/4/5.html');

 //returns:

 {
     protocol: 'http',
     host: 'google.com',
     path: '1/2/3/4',
     file: '5.html'
 }

 **/

var Store = function () {
    Object.defineProperty(this, "urls", {
        value: {}
    });
};

Object.defineProperties(Store.prototype, {
    parse: {
        value: function (url) {
            this.urlData = url.split('://');
            return {
                protocol: this.urlData[0],
                host: this.urlData[1].split('/')[0],
                path: this.urlData[1].match(/\/.*/) ? this.urlData[1].match(/\/.*/)[0] : "",
                file: this.urlData[1].match(/\/.*/) ? this.urlData[1].replace(/^.*[\\\/]/, '') : ""
            }
        }
    },
    put: {
        value: function (url) {
            var parsedUrl = this.parse(url);
            if (!this.urls[parsedUrl.host]) {
                this.urls[parsedUrl.host] = {};
            }
            if (parsedUrl.host && !this.urls[parsedUrl.host]) {
                this.urls[parsedUrl.protocol][parsedUrl.host][parsedUrl.path][parsedUrl.file] = parsedUrl;
            }
        }
    },
    get: {
        value: function (url) {
            var data = this.parse(url);
            var outcome = false;
            // Check if there is not path, only domain for visited domain
            if (!data.path && this.urls[data.host]) {
                outcome = true;
            }
            // If there is path, check if it was visited
            if (this.urls[data.host] && this.urls[data.host][data.path]) {
                outcome = true;
            }
            return outcome;
        }
    }
});