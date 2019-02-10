const Coords = require("../Coords");

/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} colorDifferenceTolerance 
 */
const floodFill = function(x, y, colorDifferenceTolerance)
{    
    var canvas = this.canvas;
    var imageSize = new Coords(canvas.width, canvas.height);

    var colorToFillOverRGBA = this.getImageData(x, y, 1, 1).data;

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

        pixelPos.x = pixelIndex % imageSize.x;
        pixelPos.y = Math.floor(pixelIndex / imageSize.x);

        var pixelRGBA = this.getImageData(pixelPos.x, pixelPos.y, 1, 1).data;
        var pixelDifference = Math.abs
        (
            pixelRGBA[0] - colorToFillOverRGBA[0]
            + pixelRGBA[1] - colorToFillOverRGBA[1]
            + pixelRGBA[2] - colorToFillOverRGBA[2]
        );

        if (pixelDifference <= colorDifferenceTolerance)
        {
            this.fillRect(pixelPos.x, pixelPos.y, 1, 1);

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
}

module.exports = floodFill;