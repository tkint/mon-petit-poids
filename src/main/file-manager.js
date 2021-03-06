import os from 'os';
import fs from 'fs';

const dir = '.mon-petit-poids';
const file = 'data.json';

export default class FileManager {
  static loadState() {
    if (fs.existsSync(this.getFilePath())) {
      const content = fs.readFileSync(this.getFilePath(), 'utf8');
      return JSON.parse(content);
    }
    return null;
  }

  static saveState(state) {
    const json = JSON.stringify(state, null, 4);
    fs.writeFile(this.getFilePath(), json, 'utf8');
    return state;
  }

  static getFilePath() {
    const homedir = os.homedir();
    const datadir = `${homedir}/${dir}`;
    if (!fs.existsSync(datadir)) {
      fs.mkdirSync(datadir);
    }
    return `${datadir}/${file}`;
  }
}
