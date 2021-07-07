class CB_Analytics {

  constructor() {
    this.now = (new Date).getTime();
    this.random = Math.random() * 99999999999;
    this.cba_tracker_key = '___cba';
  };

  collect = function () {
    try {
      this.siteData = this.getData();

      // generate the url
      var pix = document.createElement("img");
      var url = this.baseurl;
      url += "&tn=" + this.now + "&rn=" + this.random;
      url += "&dl=" + encodeURIComponent(location.href);
      url += "&dr=" + encodeURIComponent(document.referrer);
      url += "&sr=" + window.screen.height + 'x' + window.screen.width + 'x' + window.screen.pixelDepth;
      url += "&vr=" + document.documentElement.clientHeight + 'x' + document.documentElement.clientWidth;
      url += "&dt=" + encodeURIComponent(document.title);
      url += "&pf=" + encodeURIComponent(navigator.platform);
      url += "&cba=" + encodeURIComponent(this.getCbaTracker());


      pix.src = url;
      pix.style.display = "none";
      document.body.appendChild(pix);

      // any required cleanup
      this.cleanup();
    } catch (e) {
      console.error(e);
    }
  };
  getData = function () {
    return '';
  };
  isCompleted = function () {
    // Is application completed
    return false;
  }
  cleanup = function () {
    if (this.isCompleted()) {
      // cleanup any cookie and storage
      if (window.sessionStorage)
        window.sessionStorage.removeItem(this.cba_tracker_key);
    }
  }
  saveToSessionStorage = function (value) {
    try {
      if (window.sessionStorage && value)
        window.sessionStorage.setItem(this.cba_tracker_key, value);
    } catch (e) { }
  };

  getFromSessionStorage = function (key) {
    if (window.sessionStorage)
      return window.sessionStorage.getItem(this.cba_tracker_key) || '';
  };

  getCbaTracker = function () {
    var cba_tracker = (new URLSearchParams(window.location.search)).get(this.cba_tracker_key);
    if (cba_tracker) {
      this.saveToSessionStorage(cba_tracker);
    } else {
      cba_tracker = this.getFromSessionStorage(this.cba_tracker_key);
    }
    console.error(cba_tracker);
    return cba_tracker;
  };
}
var cba = new CB_Analytics();
// timeout to ensure that custom code after this line is executed first.
window.setTimeout(function () { cba.collect(); }, 0);

//prod or stage
cba.baseurl = 'http://pix.app1.test/collect?_=';

// Custom code
cba.getData = function () {
  console.log('I am overridden');
  return "x";
}

cba.isCompleted = function () {
  return true;
}
