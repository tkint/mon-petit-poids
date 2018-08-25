import Vue from 'vue';

const state = {
  profile: {
    name: null,
    height: null,
    weightGoal: null,
    birthDate: null,
  },
  records: [],
};

export const toDate = (dateString) => {
  const dateParts = dateString.split('/');
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};

const getters = {
  ORDERED_RECORDS(state) {
    return (desc) => {
      const records = [...state.records].sort((recordA, recordB) => {
        const dateA = toDate(recordA.date);
        const dateB = toDate(recordB.date);
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        }
        return 0;
      });

      if (desc) {
        records.reverse();
      }

      return records;
    };
  },
};

const mutations = {
  LOAD_STATE(state, newState) {
    if (newState != null) {
      state.profile = newState.profile;
      state.records = newState.records;
    }
  },
  ADD_RECORD(state, newRecord) {
    state.records.push(JSON.parse(JSON.stringify(newRecord)));
  },
  REMOVE_RECORD(state, index) {
    state.records.splice(index, 1);
  },
};


const saveState = state => Vue.prototype.$electron.ipcRenderer.send('saveState', state);

const actions = {
  saveState({ state }) {
    saveState(state);
  },
  loadState({ commit }, newState) {
    commit('LOAD_STATE', newState);
  },
  addRecord({ state, commit }, newRecord) {
    commit('ADD_RECORD', newRecord);
    saveState(state);
  },
  removeRecord({ state, commit }, index) {
    commit('REMOVE_RECORD', index);
    saveState(state);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
