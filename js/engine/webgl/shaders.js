const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uWorldMatrix;
    uniform mat4 uViewProjMatrix;

    void main() {
      gl_Position = uViewProjMatrix * uWorldMatrix * aVertexPosition;
    }
  `;

 const fsSource = `
 void main() {
   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
 }
`;