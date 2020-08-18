const vsColourSource = `
    attribute vec4 vertPos;

    uniform mat4 worldMat;
    uniform mat4 viewProjMat;

    void main() {
      gl_Position = viewProjMat * worldMat * vertPos;
    }
  `;

 const fsColourSource = `
 void main() {
   gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
 }
`;