import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line
import WeightManager from './weight-manager';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 800,
    height: 600,
  });

  mainWindow.maximize();
  mainWindow.setMenu(null);
  mainWindow.setTitle('Mon Petit Poids');

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('getWeightManager', (event) => {
  event.sender.send('getWeightManager', WeightManager.getInstance());
});


ipcMain.on('saveWeightManager', (event, data) => {
  event.sender.send('save', WeightManager.getInstance().save(data));
});
