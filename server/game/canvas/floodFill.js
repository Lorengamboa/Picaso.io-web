
/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} color 
 */
const floodFill = function(x, y, color) {
    const the_canvas = this.canvas;
    const the_canvas_context = this.canvas.getContext("2d");
  
    pixel_stack = [{ x: x, y: y }];
    pixels = the_canvas_context.getImageData(
      0,
      0,
      the_canvas.width,
      the_canvas.height
    );
    var linear_cords = (y * the_canvas.width + x) * 4;
    original_color = {
      r: pixels.data[linear_cords],
      g: pixels.data[linear_cords + 1],
      b: pixels.data[linear_cords + 2],
      a: pixels.data[linear_cords + 3]
    };
    
    if (original_color.r === color.r && original_color.g === color.g && original_color.b === color.b && original_color.a === color.a ) return;
    
    while (pixel_stack.length > 0) {
      new_pixel = pixel_stack.shift();
      x = new_pixel.x;
      y = new_pixel.y;
  
  
      linear_cords = (y * the_canvas.width + x) * 4;
      while (
        y-- >= 0 &&
        (pixels.data[linear_cords] == original_color.r &&
          pixels.data[linear_cords + 1] == original_color.g &&
          pixels.data[linear_cords + 2] == original_color.b &&
          pixels.data[linear_cords + 3] == original_color.a)
      ) {
        linear_cords -= the_canvas.width * 4;
      }
      linear_cords += the_canvas.width * 4;
      y++;
  
      var reached_left = false;
      var reached_right = false;
      while (
        y++ < the_canvas.height &&
        (pixels.data[linear_cords] == original_color.r &&
          pixels.data[linear_cords + 1] == original_color.g &&
          pixels.data[linear_cords + 2] == original_color.b &&
          pixels.data[linear_cords + 3] == original_color.a)
      ) {
        pixels.data[linear_cords] = color.r;
        pixels.data[linear_cords + 1] = color.g;
        pixels.data[linear_cords + 2] = color.b;
        pixels.data[linear_cords + 3] = color.a;
  
        if (x > 0) {
          if (
            pixels.data[linear_cords - 4] == original_color.r &&
            pixels.data[linear_cords - 4 + 1] == original_color.g &&
            pixels.data[linear_cords - 4 + 2] == original_color.b &&
            pixels.data[linear_cords - 4 + 3] == original_color.a
          ) {
            if (!reached_left) {
              pixel_stack.push({ x: x - 1, y: y });
              reached_left = true;
            }
          } else if (reached_left) {
            reached_left = false;
          }
        }
  
        if (x < the_canvas.width - 1) {
          if (
            pixels.data[linear_cords + 4] == original_color.r &&
            pixels.data[linear_cords + 4 + 1] == original_color.g &&
            pixels.data[linear_cords + 4 + 2] == original_color.b &&
            pixels.data[linear_cords + 4 + 3] == original_color.a
          ) {
            if (!reached_right) {
              pixel_stack.push({ x: x + 1, y: y });
              reached_right = true;
            }
          } else if (reached_right) {
            reached_right = false;
          }
        }
  
        linear_cords += the_canvas.width * 4;
      }
    }
    the_canvas_context.putImageData(pixels, 0, 0);
  };
  

module.exports = floodFill;