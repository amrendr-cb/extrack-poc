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

app.get('/init', function (req, res) {

  var tag = micro.now().toString(36);
  // TODO - asynchronously store the tag with actual tracking data for reconcilation

  //load image to initialize etag with tracking tag.
  res.cookie(cookie_tag, tag, { httpOnly: true, sameSite: 'lax' });
  res.set('Content-Type', 'text/html');
  res.send('<img src="track" crossorigin="anonymous">');
});

app.get('/track', function (req, res) {

  var init_host_path = '/init';
  const simple_etag = 'zXJtL/PG9CWr9mi2KoRu/Ka/1R0';
  const tracking_cookie_tag = req.cookies[cookie_tag];
  const refererURL = new URL(req.get('Referer') ?? 'http://fake.url');
  var tracking_etag = req.get('If-None-Match') ?? '';
  tracking_etag = tracking_etag.replace(/^W\/"/g, '').replace(/"/g, '');

  if (refererURL.pathname == init_host_path) {
    if (tracking_cookie_tag) {
      res.clearCookie(cookie_tag);
        return renderTrackingPixel(res, simple_etag + '-' + tracking_cookie_tag);
    }
    console.log('Tracking Tag: ', 'Reloading initialization');
    return res.status(304).send();
  } else {
    var tracking_etag = req.get('If-None-Match');
    if (tracking_etag) {
      tracking_etag = tracking_etag.replace(/^W\/"/g, '').replace(/"/g, '');
      if (tracking_etag == simple_etag) {
        // already tracked.
        console.log('Tracking Tag: ', 'Already Tracked');
        return res.status(304).send();
      } else {
        var tag = tracking_etag.replace(simple_etag + '-', '');
        // Send for reconcilation
        console.log('Tracking Tag: ', tag);
        console.log('Reconcilation triggered for tagId: ', tag);
        return renderTrackingPixel(res, simple_etag);
      }
    } else {
      if (req.get('Cache-Control') && req.get('Cache-Control').indexOf('no-cache') < 0) {
        // user has disabled cache, we can't track using etag.
        // TODO: What option do we have?
        console.log('Tracking Tag: ', 'No-Cache');
      }
      return renderTrackingPixel(res, simple_etag);
    }
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

const host = 'pix.app1.test';

app.listen(80, host, function () {
  console.log('Listening on http://' + host);
});


app.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});
