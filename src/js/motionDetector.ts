export default class MotionDetector {
  public canvasSource: HTMLCanvasElement;
  public contextSource: CanvasRenderingContext2D;

  public canvasMotion: HTMLCanvasElement;
  public contextMotion: CanvasRenderingContext2D;

  public blendedData: ImageData | null;
  public lastImageData: ImageData | null;

  public CHUNK_SIZE: number;
  public THRESHOLD_DIFF: number;
  public WHITE_PERCENT_THRESHOLD: number;

  public MOTION_RECT_COLOR: string;
  public MOTION_RECT_STROKE: string;

  constructor(
    canvasSource: HTMLCanvasElement,
    canvasMotion: HTMLCanvasElement,
    chunkSize: number = 20,
    thresholdDiff: number = 21,
    whitePercentThreshold: number = 30,
  ) {
    this.canvasSource = canvasSource;
    this.contextSource = <CanvasRenderingContext2D>canvasSource.getContext('2d');

    this.canvasMotion = canvasMotion;
    this.contextMotion = <CanvasRenderingContext2D>canvasMotion.getContext('2d');

    this.blendedData = null;
    this.lastImageData = null;

    this.CHUNK_SIZE = chunkSize;
    this.THRESHOLD_DIFF = thresholdDiff;
    this.WHITE_PERCENT_THRESHOLD = whitePercentThreshold;

    this.MOTION_RECT_COLOR = 'red';
    this.MOTION_RECT_STROKE = '3';
  }

  public init(width: number, height: number): void {
    this.blendedData = this.contextSource.createImageData(width, height);
  }

  public update(): void {
    this.blend();
    this.motionDetection();
  }

  public getWidth(): number {
    return this.canvasSource.width;
  }

  public getHeight(): number {
    return this.canvasSource.height;
  }

  /**
   * Считает разницу между предыдущим и текущим кадрами
   * Результат сохраняется в this.blendedData
   */
  public blend(): void {
    const width = this.getWidth();
    const height = this.getHeight();

    const sourceData = this.contextSource.getImageData(0, 0, width, height);
    if (!this.lastImageData) this.lastImageData = sourceData;

    if (this.blendedData) {
      this.differenceAccuracy(this.blendedData.data, sourceData.data, this.lastImageData.data);
    }
    this.lastImageData = sourceData;
  }

  /**
   * Считает разницу между двумя кадрами
   * Сохраняет разницу в target
   * Результат представляет собой rgba массив с черно-белым изображением
   * Белым помечается разница между кадрами (движение)
   *
   * Мутирует target, чтобы не копировать такие объемные данные
   */
  public differenceAccuracy(
    target: Uint8ClampedArray,
    data1: Uint8ClampedArray,
    data2: Uint8ClampedArray,
  ): Uint8ClampedArray {
    if (data1.length !== data2.length) return target;

    for (let i = 0; i < data1.length; i += 4) {
      const average1 = (data1[i] + data1[i + 1] + data1[i + 2]) / 3;
      const average2 = (data2[i] + data2[i + 1] + data2[i + 2]) / 3;
      const diff = this.threshold(Math.abs(average1 - average2));

      /* eslint-disable no-param-reassign */
      target[i] = diff;
      target[i + 1] = diff;
      target[i + 2] = diff;
      target[i + 3] = 255;
      /* eslint-enable */
    }

    return target;
  }

  /**
   * Решает, находится ли разница между предыдущим и текущим пикселями
   * в допустимом пределе
   */
  public threshold(value: number): 255 | 0 {
    return (value > this.THRESHOLD_DIFF) ? 255 : 0;
  }

  /**
   * Определяет границы движения в кадре
   * Идет чанками CHUNK_SIZE по разнице между кадрами (this.blendedData)
   * Движение есть, если в чанке процент содержания белого больше, чем WHITE_PERCENT_THRESHOLD
   */
  public motionDetection(): void {
    const width = this.getWidth();
    const height = this.getHeight();

    const min = [Infinity, Infinity];
    const max = [0, 0];
    for (let row = 0; row < height; row += this.CHUNK_SIZE) {
      for (let col = 0; col < width; col += this.CHUNK_SIZE) {
        const average = this.calcWhitePercent(row, col);
        if (average < this.WHITE_PERCENT_THRESHOLD) continue;
        if (col < min[0]) min[0] = col;
        if (row < min[1]) min[1] = row;
        if (col > max[0]) max[0] = col;
        if (row > max[1]) max[1] = row;
      }
    }
    this.drawRect(
      min[0],
      min[1],
      max[0] - min[0] + this.CHUNK_SIZE,
      max[1] - min[1] + this.CHUNK_SIZE,
    );
  }

  /**
   * Считает процент содержания белого в чанке
   */
  public calcWhitePercent(row: number, col: number): number {
    const sum: number = this.calcChunk(row, col);
    return sum / 255 / (this.CHUNK_SIZE ** 2) * 100;
  }

  /**
   * Считает сумму цвета всех пикселей в чанке
   * index -- значение RED для пикселя
   * Все пиксели либо черные, либо белые, поэтому достаточно считать только RED составляющую пикселя
   *
   * Позволяет не рендерить дополнительную blendedCanvas:
   * Заменяет this.ctx.getImageData(col, row, this.CHUNK_SIZE, this.CHUNK_SIZE)
   */
  public calcChunk(startRow: number, startCol: number): number {
    if (!this.blendedData) return 0;

    const width = this.getWidth();
    const height = this.getHeight();

    let sum = 0;
    for (let row = startRow; row < height && row < startRow + this.CHUNK_SIZE; row++) {
      for (let col = startCol; col < width && col < startCol + this.CHUNK_SIZE; col++) {
        const index = row * width * 4 + col * 4;
        sum += this.blendedData.data[index];
      }
    }

    return sum;
  }

  /**
   * Рисует границы дыидения на canvasMotion
   */
  public drawRect(startX: number, startY: number, endX: number, endY: number): void {
    const width = this.getWidth();
    const height = this.getHeight();

    this.contextMotion.clearRect(0, 0, width, height);
    this.contextMotion.strokeStyle = this.MOTION_RECT_COLOR;
    this.contextMotion.lineWidth = +this.MOTION_RECT_STROKE.toString;
    this.contextMotion.strokeRect(startX, startY, endX, endY);
  }
}
