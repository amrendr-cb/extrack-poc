class CB_Analytics {
  constructor() {
    this._now = (new Date).getTime();
    this._random = Math.random() * 99999999999;
    this._cba_tracker_key = '___cba';
    this._document = document;
    this._body = this._document.body;
    this._documentElement = this._document.documentElement;
    this._window = window;
    this._location = this._window.location;
    this._screen = this._window.screen;
    this._navigator = this._window.navigator;
    this._sessionStorage = this._window.sessionStorage;
  };

  collectData = function () {
    try {
      // generate the url
      var pix = this._document.createElement("img");
      var url = this.baseurl;
      url += "&tn=" + this._now + "&rn=" + this._random;
      url += "&dl=" + this.encodeComponent(this._location.href);
      url += "&dr=" + this.encodeComponent(this._document.referrer);
      url += "&sr=" + this._screen.height + 'x' + this._screen.width + 'x' + this._screen.pixelDepth;
      url += "&vr=" + this._documentElement.clientHeight + 'x' + this._documentElement.clientWidth;
      url += "&dt=" + this.encodeComponent(this._document.title);
      url += "&pf=" + this.encodeComponent(this._navigator.platform);
      url += "&cba=" + this.encodeComponent(this.getCbaTracker());
      url += "&dd=" + this.encodeComponent(this.getDataFromClient());


      pix.src = url;
      pix.style.display = "none";
      this._body.appendChild(pix);

      // any required cleanup
      this.cleanup();
    } catch (e) {
      // console.error(e);
    }
  };
  getDataFromClient = function () {
    return '';
  };
  hasApplicationCompleted = function () {
    // Is application completed
    return false;
  }
  cleanup = function () {
    if (this.hasApplicationCompleted()) {
      // cleanup any cookie and storage
      if (this._sessionStorage)
        this._sessionStorage.removeItem(this._cba_tracker_key);
    }
  }
  saveToSessionStorage = function (key, value) {
    try {
      if (this._sessionStorage && value)
        this._sessionStorage.setItem(key, value);
    } catch (e) { }
  };
  encodeComponent = function (value) {
    return encodeURIComponent(value);
  };
  getFromSessionStorage = function (key) {
    if (this._sessionStorage)
      return this._sessionStorage.getItem(key) || '';
  };

  getCbaTracker = function () {
    var cba_tracker = (new URLSearchParams(this._location.search)).get(this._cba_tracker_key);
    if (cba_tracker) {
      this.saveToSessionStorage(this._cba_tracker_key, cba_tracker);
    } else {
      cba_tracker = this.getFromSessionStorage(this._cba_tracker_key);
    }
    // console.error(cba_tracker);
    return cba_tracker;
  };
}
var __cba = new CB_Analytics();
// timeout to ensure that custom code after this line is executed first.
window.setTimeout(function () { __cba.collectData(); }, 0);

//prod or stage
__cba.baseurl = 'http://pix.app1.test/collect?_=';

// Custom code
__cba.getDataFromClient = function () {
  console.log('I am overridden');
  return "x";
}

__cba.ApplicationCompleted = function () {
  return true;
}
