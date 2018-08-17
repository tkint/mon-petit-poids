/* eslint-disable no-underscore-dangle */
const fs = require('fs');

class Profile {
  name;
  height;
  weightGoal;
  birthDate;

  constructor() {
    this.name = null;
    this.height = 0;
    this.birthDate = 0;
    this.weightGoal = 0;
  }
}

class Data {
  profile;
  records;

  constructor() {
    this.profile = new Profile();
    this.records = [];
  }

  static fromJSON(json) {
    return JSON.parse(json);
  }
}

export default class WeightManager {
  static instance = null;
  data = null;

  constructor() {
    if (fs.existsSync('data.json')) {
      const json = fs.readFileSync('data.json', 'utf8');
      this.data = Data.fromJSON(json);
    } else {
      this.data = new Data();
    }
  }

  static getInstance() {
    if (this.instance === null) {
      this.instance = new WeightManager();
    }
    return this.instance;
  }

  save(weightManagerData) {
    this.data = weightManagerData;
    const json = JSON.stringify(this.data);
    fs.writeFile('data.json', json, 'utf8');
    return this;
  }
}
