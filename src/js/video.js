import Hls from 'hls.js';

/**
 * Видеонаблюдение
 */
(() => {
  function initVideo(video, url) {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }
  }

  initVideo(
    document.getElementById('video1'),
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
  );

  initVideo(
    document.getElementById('video2'),
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
  );
  initVideo(
    document.getElementById('video3'),
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
  );
  initVideo(
    document.getElementById('video4'),
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
  );
})();
