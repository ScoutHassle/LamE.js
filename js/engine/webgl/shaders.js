const vsSource = `
    attribute vec4 vertPos;

    uniform mat4 worldMat;
    uniform mat4 viewProjMat;

    void main() {
      gl_Position = viewProjMat * worldMat * vertPos;
    }
  `;

 const fsSource = `
 void main() {
   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
 }
`;