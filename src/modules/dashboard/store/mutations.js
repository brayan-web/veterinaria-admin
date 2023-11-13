export const addPatient = (state, patient) => {
    state.patients = [ patient, ...state.patients ]
}

export const setPatients = (state, patients) => {
    state.patients = [ ...state.patients, ...patients ]
}
