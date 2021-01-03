const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;
let mainWindow;

//Listen for app to be ready

app.on("ready", function () {
  //Create new window
  mainWindow = new BrowserWindow({});
  //Load html into window

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );

  //Quit app when closed
  mainWindow.on("closed", function () {
    app.quit();
  });

  //Build menu from template

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //Insert MEnu
  Menu.setApplicationMenu(mainMenu);
});

//Handle create add window
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 150,
    title: "Add Shopping List Item",
  });
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );

  //Garbage Collection handle
  addWindow.on("close", () => {
    addWindow = null;
  });
}

//Create menu template

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Items",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Items",
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

//if mac, add empty object to menu
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}
