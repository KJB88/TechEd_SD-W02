/* --------------------------- 
Definition of Custom Particle shape for mo.js
Also adds the new particle shape to the libs registry for construction
As defined on the Mo.js website: https://mojs.github.io/tutorials/shape-swirl/#custom-shapes 
 --------------------------- */

class Heart extends mojs.CustomShape {
  getShape() {
    return '<path d="M92.6 7.4c-10-9.9-26-9.9-35.9 0l-4.4 4.3a3.4 3.4 0 0 1-4.7 0l-4.3-4.3c-10-9.9-26-9.9-35.9 0a25 25 0 0 0 0 35.5l22.4 22.2 13.5 13.4a9.5 9.5 0 0 0 13.4 0L70.2 65 92.6 43a25 25 0 0 0 0-35.5z"/>';
  }
}
mojs.addShape("heart", Heart);

const heart = new mojs.Shape({
  shape: "heart",
  fill: "red",
  stroke: "darkred",
  scale: { 0: 1 },
  strokeWidth: { 50: 0 },
  duration: 1000,
});
