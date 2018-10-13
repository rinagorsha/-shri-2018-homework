export default class MotionDetector {
  constructor(canvasSource, canvasBlended, canvasMotion, chunkSize = 20, thresholdDiff = 21, whitePercentThreshold = 30) {
    console.log(canvasSource, canvasBlended, canvasMotion)
    this.canvasSource = canvasSource;
    this.contextSource = canvasSource.getContext('2d');
    
    this.canvasBlended = canvasBlended;
    this.contextBlended = canvasBlended.getContext('2d');
    
    this.canvasMotion = canvasMotion;
    this.contextMotion = canvasMotion.getContext('2d');
    
    this.lastImageData = null;
    this.CHUNK_SIZE = chunkSize;
    this.THRESHOLD_DIFF = thresholdDiff;
    this.WHITE_PERCENT_THRESHOLD = whitePercentThreshold;
  }
  
  update() {
    this.blend();
    this.motionDetection();
  }
  
  getWidth() {
    return this.canvasSource.width;
  }
  
  getHeight() {
    return this.canvasSource.height;
  }
  
  blend() {
    const width = this.getWidth();
    const height = this.getHeight();
    
    var sourceData = this.contextSource.getImageData(0,0,width,height);
    if (!this.lastImageData) this.lastImageData = sourceData;
    var blendedData = this.contextSource.createImageData(width, height);

    this.differenceAccuracy(blendedData.data, sourceData.data, this.lastImageData.data);
    this.contextBlended.putImageData(blendedData, 0, 0);
    this.lastImageData = sourceData;
  }
  
  differenceAccuracy(target, data1, data2) {
    if (data1.length !== data2.length) return null;
    for(let i = 0; i < data1.length; i += 4) {
      var average1 = (data1[i] + data1[i+1] + data1[i+2]) / 3;
      var average2 = (data2[i] + data2[i+1] + data2[i+2]) / 3;
      var diff = this.threshold(Math.abs(average1 - average2));

      target[i] = diff;
      target[i+1] = diff;
      target[i+2] = diff;
      target[i+3] = 255;
    }
  }
  
  threshold(value) {
    return (value > this.THRESHOLD_DIFF) ? 255 : 0;
  }

  motionDetection() {
    const width = this.getWidth();
    const height = this.getHeight();

    let min = [Infinity, Infinity];
    let max = [0, 0];
    for (let row = 0; row < height; row += this.CHUNK_SIZE) {
      for (let col = 0; col < width; col += this.CHUNK_SIZE) {
        const data = this.contextBlended.getImageData(col, row, this.CHUNK_SIZE, this.CHUNK_SIZE);
        const average = this.calcAverage(data.data);
        if (average < this.WHITE_PERCENT_THRESHOLD) continue;
        if (col < min[0]) min[0] = col;
        if (row < min[1]) min[1] = row;
        if (col > max[0]) max[0] = col;
        if (row > max[1]) max[1] = row;
      }
    }
    this.drawRect(min[0], min[1], max[0] - min[0] + this.CHUNK_SIZE, max[1] - min[1]+ this.CHUNK_SIZE)
  }

  calcAverage(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum += data[i];
    }
    return sum / 255 / (data.length / 4) * 100;
  }

  drawRect(startX, startY, endX, endY) {
    const width = this.getWidth();
    const height = this.getHeight();

    this.contextMotion.clearRect(0, 0, width, height);
    this.contextMotion.strokeStyle = "red";
    this.contextMotion.lineWidth="3";
    this.contextMotion.strokeRect(startX, startY, endX, endY);
  }
}
