/**
 var u = new URLStorer();
 u.push('https://google.com/1/2/3/4/5/index.html'); //returns nothing
 u.push('http://jsbin.com/lixifurule/1/edit?js,console'); //returns nothing
 u.push('https://toggl.com/app/timer'); //returns nothing
 u.hasVisited('https://google.com'); // returns true
 u.hasVisited('http://jsbin.com'); // returns true
 u.hasVisited('https://toggl.com'); // returns true
 u.hasVisited('https://facebook.com'); // returns false
 **/

var URLStorer = function () {
    this.sites = {};
};

URLStorer.prototype.urlData = function (url) {
    var protocolAndPath = url.split('://');
    return {
        protocol: protocolAndPath[0],
        domain: protocolAndPath[1].split('/')[0],
        path: protocolAndPath[1].match(/\/.*/) ? protocolAndPath[1].match(/\/.*/)[0] : ""
    }
}

URLStorer.prototype.push = function (url) {
    var data = this.urlData(url);
    if (!this.sites[data.domain]) {
        this.sites[data.domain] = {};
    }
    if (data.path && !this.sites[data.domain][data.path]) {
        this.sites[data.domain][data.path] = data;
    }
}

URLStorer.prototype.hasVisited = function (url) {
    var data = this.urlData(url);
    // Check if there is not path, only domain for visited domain
    if (!data.path && this.sites[data.domain]) {
        return true;
    }
    // If there is path, check if it was visited
    if (this.sites[data.domain] && this.sites[data.domain][data.path]) {
        return true;
    }
    return false;
}
