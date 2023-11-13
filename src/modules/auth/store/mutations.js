export const loader = (state, newLoaderState) => {
  state.isLoading = newLoaderState;
};

export const logInUser = (state, { token, user }) => {
  if (token) {
    localStorage.setItem("token", token);
    state.token = token;
  }

  state.user = user;
  state.status = "authenticated";
};

export const logOut = (state) => {
        state.user = null;
        state.token = null;
        state.status = 'no-authenticated';
        localStorage.removeItem('token')

  };
