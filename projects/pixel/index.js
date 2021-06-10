var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
var micro = require('microtime');
const cookieParser = require('cookie-parser');
const URL = require('url').URL;

const cookie_tag = 'cb_apply_tag';
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));
app.use(cookieParser());

app.get('/collect', function (req, res) {
  var tag = micro.now().toString(36);
  res.cookie(cookie_tag, tag, { httpOnly: true, sameSite: 'lax' });
  res.send();
});

app.get('/track', function (req, res) {

  var host = 'localhost:3000';
  const simple_etag = 'zXJtL/PG9CWr9mi2KoRu/Ka/1R0';
  const tracking_cookie_tag = req.cookies[cookie_tag];

  if (tracking_cookie_tag) {
    // setup tracking pixel.
    res.clearCookie(cookie_tag);
    return renderTrackingPixel(res, simple_etag + '-' + tracking_cookie_tag)
  }
  var tracking_etag = req.get('If-None-Match');
  if (tracking_etag) {
    const refererURL = new URL(req.get('Referer') ?? 'http://fake.url');
    //console.log(refererURL);
    tracking_etag = tracking_etag.replace(/^W\/"/g, '').replace(/"/g, '');
    if (tracking_etag == simple_etag) {
      // already tracked.
      console.log('Tracking Tag: ', 'None');
      return res.status(304).send();
    } else if (!refererURL.search) {
      console.log('Tracking Tag: ', refererURL.host);
      // reloading cb_page that has setup the tracker pixel should not trigger reconcilation.
      return res.status(304).send();
    } else {
      var tag = tracking_etag.replace(simple_etag + '-', '');
      // Send for reconcilation
      console.log('Tracking Tag: ', tag);
      console.log('Reconcilation triggered for tagId: ', tag);
      return renderTrackingPixel(res, simple_etag);
    }
  } else {
    console.log('Tracking Tag: ', 'No-Cache');
    // user has disabled cache, we can't track using etag.
    // TODO: What option do we have?
    var tag = '';
    if (req.get('Cache-Control') && req.get('Cache-Control').indexOf('no-cache') < 0) {
      tag = '-' + micro.now().toString(36);
    }
    // loading non tracking pixel image.
    return renderTrackingPixel(res, simple_etag + tag);
  }
});

var renderTrackingPixel = (res, etag) => {
  var file = path.join(dir, 'photo.png');
  var s = fs.createReadStream(file);

  s.on('open', function () {
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'private, must-revalidate, proxy-revalidate');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('ETag', 'W/"' + etag + '"');
    s.pipe(res);
  });

  s.on('error', function () {
    res.set('Content-Type', 'text/plain');
    res.status(404).send('Not found');
  });
}

app.get('*', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(404).send('Not found');
});

app.listen(3000, function () {
  console.log('Listening on http://localhost:3000/');
});
