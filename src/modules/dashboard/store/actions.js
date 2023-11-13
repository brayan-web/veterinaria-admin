import { api } from "boot/axios";

export const addPatient = async ({ commit }, patient = {}) => {
  const {
    nombreMascota,
    nombrePropietario,
    emailPropietario,
    sintomas,
    fechaAlta,
  } = patient;
  try {
    const patient = {
      nombre: nombreMascota,
      propietario: nombrePropietario,
      email: emailPropietario,
      sintomas: sintomas,
      fecha: fechaAlta,
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.post("/pacientes", patient, config);
    const { createdAt, updatedAt, __v, ...patientStorage } = data;
    commit("addPatient", patientStorage);

    return { ok: true, message: "agregado correctamente" };
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};

export const getPatients = async ({ commit }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.get("/pacientes", config);
    if (!data) {
      commit("setPatients", []);
      return;
    }
    // const patients = [];
    // patients.push(data);
    commit("setPatients", data);
  } catch (error) {
    return { ok: false, message: error.response.data.msg };
  }
};
