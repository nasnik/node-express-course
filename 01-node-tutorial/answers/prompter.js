const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// Variables to store selected styles
let backgroundColor = "white";
let textColor = "black";
let textAlign = "left";
let fontStyle = "normal";

// Form HTML with checkboxes for styling options
const form = () => {
  return `
  <body style="background-color: ${backgroundColor}; color: ${textColor}; text-align: ${textAlign}; font-style: ${fontStyle};">
    <p>Applied Styles: Background - ${backgroundColor}, Text Color - ${textColor}, Text Align - ${textAlign}, Font Style - ${fontStyle}</p>
    <form method="POST">
      <label><input type="checkbox" name="backgroundColor" value="lightblue"> Light Blue Background</label><br>
      <label><input type="checkbox" name="textColor" value="darkred"> Dark Red Text</label><br>
      <label><input type="checkbox" name="textAlign" value="center"> Center Align Text</label><br>
      <label><input type="checkbox" name="fontStyle" value="italic"> Italic Font Style</label><br>
      <button type="submit">Apply Styles</button>
    </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    getBody(req, (body) => {
      // Update styles based on submitted checkboxes
      backgroundColor = body.backgroundColor || "white";
      textColor = body.textColor || "black";
      textAlign = body.textAlign || "left";
      fontStyle = body.fontStyle || "normal";

      // Redirect to the form to display changes
      res.writeHead(303, { Location: "/" });
      res.end();
    });
  } else {
    // Display the form with current styles
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form());
  }
});
server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});
server.listen(3000);
console.log("The server is listening on http://localhost:3000");
