### 2D Graphics Illustator: [graphics-playground.com](https://graphics-playground.com)

#### General Info:

Allows user to create illustrations and manipulate images on a "canvas." The user may add lines, shapes, and background images using the tool buttons and mouse clicks. Clicking the "help me" button on the site gives more detail into the specific functionality available to the user when creating their graphics.

#### Technical Info:

All graphics displayed on two SVG images layered directly on top of a canvas element.

---

#### Shapes:

Paths, shapes, and circles are drawn on the top-most SVG image based on the user's click positions. When a user has finished "drawing" one of these shapes, the graphic is computed and added to the top-most SVG based on the selected shape type. All computation is done through JavaScript files by creating "edges".

- Listener/Executor for shapes: [draw.js](/draw.js)
- "linear" shapes are drawn by creating edges between the points clicked and connecting the last point to the starting point. The shape is then filled with the color/gradient chosen by the user. Shapes fill using rectangles with 1px of height and a width that connects the two edges.
  - A "winder" value is assigned to each edge, so the filler knows when to fill between two edges.
  - More on edges: [edge.js](/models/edge.js) [point.js](/models/point.js)
- "quadratic" and "cubic" shapes use three(quad) or four(cubic) points to calculate how a shape will fill. This means creating a certain number of edges that form a "curve" using the available points. Circles also use quadratic calculations.
  - Quadratic and Cubic calculations at bottom of: [edge.js](/models/edge.js)
  - Create circle from two points: [path.js](/models/path.js)
- The vertical gradient fill mode takes in two colors and calculates the weight of each from top to bottom of the shape.

#### Images:

Images and tints are displayed on the bottom SVG image. When a user selects an image file, the image fills the "canvas" in the background. Tints are added ontop of the image on the same SVG image.

- Listener/Executor for images: [shader.js](/shader.js)
- Images are manipulated to fit the "canvas" by finding the corresponding pixel to each (x,y) coordinate on the "canvas." Pixels are then added as squares to the SVG as the final fitted image.
- Tints are specified by the color/gradient and opacity set by the user. The will also fill the entirity of the "canvas."

---

#### About Me:

I began studying 2D graphics in the fall of 2021 at UNC Chapel Hill using C++. I created this project in order to showcase the tools in my graphics library and share the capabilities with others. This involved optimizing/recreating my graphic tools for JavaScript, but it allows for more immediate visualization of my output as I continue to expand my capabilities. Feel free to contact me for whatever reason at michaelbeebe1031@gmail.com.
