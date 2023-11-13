import { computed } from "vue";
import { useStore } from "vuex";
const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    const response = await store.dispatch("auth/createUser", user);

    return response;
  };

  const confirmAccount = async (token) => {
    const response = await store.dispatch("auth/confirmAccount", token);
    return response;
  };

  const isLoading = computed({
    get() {
      return store.getters["auth/getStatusLoading"];
    },
    set(val) {
      store.commit("auth/getStatusLoading");
    },
  });

  const resetPassword = async (email) => {
    const response = await store.dispatch("auth/resetPassword", email);
    return response;
  };

  const validateTokenPassword = async (token) => {
    const response = await store.dispatch("auth/validateTokenPassword", token);
    return response;
  };

  const sendNewPassword = async (token, password) => {
    const response = await store.dispatch("auth/sendNewPassword", {
      token,
      password,
    });
    return response;
  };

  /*  ******************************************************************************************* */
  const loginUser = async (user) => {
    const response = await store.dispatch("auth/loginUser", user);

    return response;
  };

  const logOut = () => {
    store.commit('auth/logOut')
  }

  return {
    createUser,
    confirmAccount,
    isLoading,
    resetPassword,
    validateTokenPassword,
    sendNewPassword,
    loginUser,
    logOut
  };
};

export default useAuth;
