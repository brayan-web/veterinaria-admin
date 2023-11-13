import { api } from "boot/axios";

export const createUser = async ({ commit }, user) => {
  commit("loader", true);
  const { name, email, confirmPassword } = user;
  try {
    await api.post("/veterinarios", {
      nombre: name,
      email: email,
      password: confirmPassword,
    });
    commit("loader", false);
    return { ok: true, message: "Creado correctamente, revisa tu email" };
  } catch (error) {
    commit("loader", false);
    return { ok: false, message: error.response.data.msg };
  }
};

export const confirmAccount = async ({ commit }, token) => {
  commit("loader", true);
  try {
    const response = await api.get(`/veterinarios/confirmar/${token}`);
    console.log(response);
    commit("loader", false);
    return { ok: true, message: response.data.msg };
  } catch (error) {
    commit("loader", false);
    return { ok: false, message: "Error con el enlace" };
  }
};

export const resetPassword = async ({ commit }, email) => {
  commit("loader", true);
  try {
    const { data } = await api.post("/veterinarios/olvide-password", { email });
    commit("loader", false);
    return { ok: true, message: data.msg };
  } catch (error) {
    commit("loader", false);
    return { ok: false, message: error.response.data.msg };
  }
};

export const validateTokenPassword = async ({ commit }, token) => {
  commit("loader", true);
  try {
    await api.get(`/veterinarios/olvide-password/${token}`);
    commit("loader", false);
    return { ok: true, message: "Coloca tu Nuevo Password" };
  } catch (error) {
    commit("loader", false);
    return { ok: false, message: "Hubo un error con el enlace" };
  }
};

export const sendNewPassword = async ({ commit }, { token, password }) => {
  commit("loader", true);
  try {
    const { data } = await api.post(`/veterinarios/olvide-password/${token}`, {
      password,
    });
    commit("loader", false);
    return { ok: true, message: data.msg };
  } catch (error) {
    commit("loader", false);
    return { ok: false, message: error.response.data.msg };
  }
};

export const loginUser = async ({ commit }, user) => {
  const { email, password } = user;
  try {
    const { data } = await api.post("/veterinarios/login", { email, password });
    const { token } = data;
    delete user.password;
    commit("logInUser", { token, user });
    return { ok: true, message: "Bienvenido" };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const checkAuthentication = async ({ commit }, user) => {
  const token = localStorage.getItem("token");
  if (!token) {
    commit("logOut");
    return { ok: false, message: "No hay token, cerrando sesion" };
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await api.get("/veterinarios/perfil", config);
    console.log(data);
    const user = {
      name: data.nombre,
      email: data.email,
    };
    commit("logInUser", { token, user });
    return { ok: true, message: "" };
  } catch (error) {
    commit("logOut");
    return { ok: false, message: error.response.data.msg };
  }
};
