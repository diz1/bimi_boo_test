export default {
  namespaced: true,
  state: {
    records: []
  },
  mutations: {
    pushRecord(state, recordItem) {
      state.records.push(recordItem);
    },
    deleteRecord(state, recordId) {
      state.records = state.records.filter(t => t.id !== recordId);
    },
    updateRecords(state, recordItem) {
      state.records = state.records.map(r =>
        r.id === recordItem.id ? (r = recordItem) : r
      );
    }
  },
  actions: {
    addNewRecord({ commit }, recordItem) {
      commit("pushRecord", recordItem);
    },
    removeRecord({ commit }, recordId) {
      commit("deleteRecord", recordId);
    },
    updateRecord({ commit }, recordItem) {
      commit("updateRecords", recordItem);
    }
  },
  getters: {
    records: s => s.records,
    lastRecordId: s =>
      s.records[s.records.length - 1] && s.records[s.records.length - 1].id
        ? s.records[s.records.length - 1].id
        : 0
  }
};
