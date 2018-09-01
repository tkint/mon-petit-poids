/* eslint-disable no-console */
import Vue from 'vue';

const state = {
  profiles: [],
  defaultProfile: {
    id: -1,
    name: null,
    height: null,
    weightGoal: null,
    birthDate: null,
    records: [],
  },
  defaultRecord: {
    id: null,
    date: new Date().toLocaleDateString('fr-FR'),
    weight: null,
  },
};

export const toDate = (dateString) => {
  const dateParts = dateString.split('/');
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};

const getProfileById = (state, id) => state.profiles.find(p => p.id === id);

const getters = {
  GET_PROFILE_BY_ID(state) {
    return (profileId) => {
      let profile = state.profiles.find(p => p.id === profileId);
      if (!profile && profileId === -1) {
        const newProfileId = Math.max(...state.profiles.map(p => p.id), 0) + 1;
        profile = JSON.parse(JSON.stringify(state.defaultProfile));
        profile.id = newProfileId;
        state.profiles.push(profile);
      }
      return profile;
    };
  },
  ORDERED_RECORDS(state) {
    return (profileId, desc) => {
      const profile = state.profiles.find(p => p.id === profileId);
      let records = [];
      if (profile) {
        records = [...profile.records].sort((recordA, recordB) => {
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
      }
      return records;
    };
  },
};

const mutations = {
  LOAD_STATE(state, profiles) {
    if (profiles !== null) {
      state.profiles = profiles;
    }
  },
  ADD_PROFILE(state) {
    const newProfileId = Math.max(...state.profiles.map(p => p.id), 0) + 1;
    const profile = JSON.parse(JSON.stringify(state.defaultProfile));
    profile.id = newProfileId;
    state.profiles.push(profile);
  },
  REMOVE_PROFILE(state, profileId) {
    const profileIndex = state.profiles.map(p => p.id).indexOf(profileId);
    state.profiles.splice(profileIndex, 1);
  },
  ADD_RECORD(state, profileId) {
    const profile = getProfileById(state, profileId);
    if (profile) {
      const newRecordId = Math.max(...profile.records.map(p => p.id), 0) + 1;
      const record = JSON.parse(JSON.stringify(state.defaultRecord));
      record.id = newRecordId;
      profile.records.push(record);
      state.defaultRecord = {
        id: null,
        date: new Date().toLocaleDateString('fr-FR'),
        weight: null,
      };
    }
  },
  REMOVE_RECORD(state, { profileId, recordId }) {
    const profile = getProfileById(state, profileId);
    if (profile) {
      const recordIndex = profile.records.map(r => r.id).indexOf(recordId);
      profile.records.splice(recordIndex, 1);
    }
  },
};


const saveState = state => Vue.prototype.$electron.ipcRenderer.send('saveState', state.profiles);

const actions = {
  SAVE_STATE({ state }) {
    saveState(state);
  },
  LOAD_STATE({ commit }, newState) {
    commit('LOAD_STATE', newState);
  },
  ADD_PROFILE({ state, commit }, newProfile) {
    commit('ADD_PROFILE', newProfile);
    saveState(state);
  },
  REMOVE_PROFILE({ state, commit }, profileId) {
    commit('REMOVE_PROFILE', profileId);
    saveState(state);
  },
  ADD_RECORD({ state, commit }, profileId) {
    commit('ADD_RECORD', profileId);
    saveState(state);
  },
  REMOVE_RECORD({ state, commit }, { profileId, recordId }) {
    commit('REMOVE_RECORD', { profileId, recordId });
    saveState(state);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
