import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'
import authModule from '../modules/auth/store';
import patientsModule from '../modules/dashboard/store'



export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
     auth: authModule,
     patients: patientsModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
