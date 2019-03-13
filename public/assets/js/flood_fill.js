CanvasRenderingContext2D.prototype.floodFill = function(x, y, color)
{   
    var RGB = hexToRGB(color);

    var canvas = this.canvas;
    var imageSize = new Coords(canvas.width, canvas.height);

    var startPixel = this.getImageData(x, y, 1, 1).data;
    var canvasImageData = this.getImageData(0, 0, canvas.width, canvas.height);

    var pixelPos = new Coords(x, y);
    var pixelIndexStart = pixelPos.y * imageSize.x + pixelPos.x;
    var pixelIndicesToTest = [ pixelIndexStart ];
    var pixelIndicesAlreadyTested = [];

    var neighborOffsets = 
    [
        new Coords(-1, 0),
        new Coords(1, 0),
        new Coords(0, -1),
        new Coords(0, 1)
    ];

    while (pixelIndicesToTest.length > 0)
    {
        var pixelIndex = pixelIndicesToTest[0];
        pixelIndicesToTest.splice(0, 1);
        pixelIndicesAlreadyTested[pixelIndex] = pixelIndex;

        pixelPos.x = Math.floor(pixelIndex % imageSize.x);
        pixelPos.y = Math.floor(pixelIndex / imageSize.x);

        var pixelRGBA = this.getImageData(pixelPos.x, pixelPos.y, 1, 1);
        var pixelDifference = Math.abs
        (
            pixelRGBA.data[0] - startPixel[0]
            + pixelRGBA.data[1] - startPixel[1]
            + pixelRGBA.data[2] - startPixel[2]
        );
          
        if (pixelDifference === 0)
        {
          const pixel = getPixel(canvasImageData, pixelPos.x, pixelPos.y);

            canvasImageData.data[pixel] = RGB[0];
            canvasImageData.data[pixel+1] = RGB[1];
            canvasImageData.data[pixel+2] = RGB[2];
            canvasImageData.data[pixel+3] = 255;

            var neighborPos = new Coords();

            for (var n = 0; n < neighborOffsets.length; n++)
            {
                var neighborOffset = neighborOffsets[n];

                neighborPos.overwriteWith
                (
                    pixelPos
                ).add
                (
                    neighborOffset
                );

                if (neighborPos.isInRange(imageSize) == true)
                {
                    var neighborIndex = 
                        neighborPos.y * imageSize.x + neighborPos.x;
                    var isPixelIndexAlreadyUnderConsideration = 
                    (
                        pixelIndicesToTest.indexOf(neighborIndex) >= 0 
                        || pixelIndicesAlreadyTested[neighborIndex] != null
                    )  
                    if (isPixelIndexAlreadyUnderConsideration == false)
                    {
                        pixelIndicesToTest.push(neighborIndex);
                    }
                }
            }
        }                
    }

   this.putImageData(canvasImageData, 0, 0);
}

// classes

function Coords(x, y)
{
this.x = x;
this.y = y;
}
{
Coords.prototype.add = function(other)
{
    this.x += other.x;
    this.y += other.y;
    return this;
}

Coords.prototype.clone = function()
{
    return new Coords(this.x, this.y);
}

Coords.prototype.isInRange = function(max)
{
    var returnValue = 
    (
        this.x >= 0 
        && this.x <= max.x
        && this.y >= 0 
        && this.y <= max.y
    );
    return returnValue;
}

Coords.prototype.overwriteWith = function(other)
{
    this.x = other.x;
    this.y = other.y;
    return this;
}

Coords.prototype.subtract = function(other)
{
    this.x -= other.x;
    this.y -= other.y;
    return this;
}
}

const RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i;

const hexToRGB = str => {
  const [ , short, long ] = String(str).match(RGB_HEX) || [];

  if (long) {
    const value = Number.parseInt(long, 16);
    return [ value >> 16, value >> 8 & 0xFF, value & 0xFF ];
  } else if (short) {
    return Array.from(short, s => Number.parseInt(s, 16)).map(n => (n << 4) | n);
  }
};

function getPixel(imageData, x, y) {
  var index = (x + y * imageData.width) * 4;

  return index;
}