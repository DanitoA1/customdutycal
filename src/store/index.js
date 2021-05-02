import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    superAdmin: false,
    userId: '',
    loginError: {},
    signUpError: {},
    rateStatus: 0,
    tariffStatus: 0,
    loader: false,
    rates: [],
    tariffs: [],
  },
  mutations: {
    setUser(state, val) {
      state.userProfile = val;
    },
    setSuperAdmin(state, val) {
      state.superAdmin = val;
    },
    setUserid(state, val) {
      state.userId = val;
    },
    setLoginError(state, val) {
      state.loginError = val;
    },
    setSignUpError(state, val) {
      state.signUpError = val;
    },
    setRateStatus(state, val) {
      state.rateStatus = val;
    },
    setTariffStatus(state, val) {
      state.tariffStatus = val;
    },
    setLoader(state, val) {
      state.loader = val;
    },
    setRates(state, val) {
      state.rates = val;
    },
    setTariffs(state, val) {
      state.tariffs = val;
    },
  },
  actions: {
    async login({ commit }, form) {
      // sign user in
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
        // fetch user profile and set in state
        if (user.uid === 'GbcoCqntQlUiiZGi81bZIiVb3IP2' || user.uid === 'hc50x6xq3saWuGuIRI7sCl6z9Xe2') {
          commit('setSuperAdmin', true);
        }
        commit('setUser', user);
      } catch (error) {
        commit('setLoginError', error);
        console.log(error);
      }
      // change route to calculator
      if (router.currentRoute.path === '/login' || router.currentRoute.path === '/signup') {
        router.push('/');
      }
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit('setUserProfile', userProfile.data());
      // change route to dashboard
      if (router.currentRoute.path === '/login' || router.currentRoute.path === '/signup') {
        router.push('/admin');
      }
    },
    async signup({ dispatch, commit }, form) {
      // sign user up
      try {
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user);
      } catch (error) {
        commit('setSignUpError', error);
        console.log(error);
      }
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      // clear userProfile and redirect to /login
      commit('setUserProfile', {});
      router.push('/');
    },
    async uploadRates({ commit }, ratesArray) {
      commit('setLoader', true);
      commit('setRateStatus', 0);
      try {
        await fb.ratesCollection.doc('currentRates').set({
          createdOn: new Date(),
          rates: ratesArray,
        });
        commit('setRateStatus', 1);
      } catch (error) {
        commit('setRateStatus', error);
        console.log(error);
      }
      commit('setLoader', false);
    },
    async uploadTariffs({ commit }, tariffsArray) {
      commit('setLoader', true);
      commit('setTariffStatus', 0);
      try {
        await fb.tariffsCollection.doc('currentTariffs').set({
          createdOn: new Date(),
          tariffs: tariffsArray,
        });
        commit('setTariffStatus', 1);
      } catch (error) {
        commit('setTariffStatus', error);
        console.log(error);
      }
      commit('setLoader', false);
    },
    async getCurrentRates({ commit }) {
      await fb.ratesCollection.doc('currentRates').onSnapshot((doc) => {
        commit('setRates', doc.data());
      });
    },
    async getCurrentTariffs({ commit }) {
      await fb.tariffsCollection.doc('currentTariffs').onSnapshot((doc) => {
        commit('setTariffs', doc.data());
      });
    },
    async saveCalculation({ commit }, calDetails) {
      const status = await fb.calculationsCollection.add({
        createdOn: new Date(),
        userEmail: fb.auth.currentUser.email,
        result: calDetails,
      });
      commit('setValue', status);
    },
  },
});

export default store;
