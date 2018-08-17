const state = {
  profile: {
    name: null,
    height: null,
    weightGoal: null,
    birthDate: null,
  },
  records: [],
};

const mutations = {
  LOAD_STATE(state, newState) {
    state.profile = newState.profile;
    state.records = newState.records;
  },
  ADD_RECORD(state, newRecord) {
    state.records.push(JSON.parse(JSON.stringify(newRecord)));
  },
  REMOVE_RECORD(state, index) {
    state.records.splice(index, 1);
  },
};

const actions = {
  saveState({ state }, ipcRenderer) {
    ipcRenderer.send('saveWeightManager', state);
  },
  loadState({ commit }, newState) {
    commit('LOAD_STATE', newState);
  },
  addRecord({ commit }, newRecord) {
    commit('ADD_RECORD', newRecord);
  },
  removeRecord({ commit }, index) {
    commit('REMOVE_RECORD', index);
  },
};

export default {
  state,
  mutations,
  actions,
};
