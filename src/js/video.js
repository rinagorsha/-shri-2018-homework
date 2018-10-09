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

(() => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 64;
  
  const canvas = document.getElementById('video-monitoring-canvas');
  const canvasCtx = canvas.getContext('2d');
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  let dataArrayAlt;
  let bufferLengthAlt;

  const elements = document.querySelectorAll('.js-video-container');
  for (let item of elements) {
    item.addEventListener('click', function() {
      const element = this.querySelector('video');
      expandVideo(element);
    });
  }


  function expandVideo(mediaElement) {
    const source = audioCtx.createMediaElementSource(mediaElement);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    bufferLengthAlt = analyser.frequencyBinCount;
    dataArrayAlt = new Uint8Array(bufferLengthAlt);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    visualizing();
  }


  function visualizing() {
    let drawVisual = requestAnimationFrame(visualizing);

    analyser.getByteFrequencyData(dataArrayAlt);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    let barWidth = (WIDTH / bufferLengthAlt) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLengthAlt; i++) {
      barHeight = dataArrayAlt[i];

      canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
      canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

      x += barWidth + 1;
    }
  };
})();
