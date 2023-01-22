const { app, BrowserWindow } = require("electron");

let options = {
  mode: "text",
  pythonPath: "path/to/python",
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: "/script.py",
  //   args: ['value1', 'value2', 'value3']
};

const { PythonShell } = require("python-shell", options, function (
  err,
  results
) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log("results: %j", results);
});

let pyshell = new PythonShell("script.py");

function createWindow() {
  window = new BrowserWindow({ width: 800, height: 600 });
  window.loadFile("index.html");

  //   to node
  pyshell.on("message", function (message) {
    console.log("message", message);
  });

  //   to python
  pyshell.send("Node >>>>> Python");

  pyshell.end(function (err) {
    if (err) {
      throw err;
    }
    console.log("finished");
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
