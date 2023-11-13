
import { computed } from "vue";
import { useStore } from "vuex"
const usePatients = () => {
    const store = useStore();
    const addPatient = async(patient) => {
        const response = await store.dispatch('patients/addPatient', patient)
        return response;
    }
    const getPatients = async() => {
        const response = await store.dispatch('patients/getPatients');
        return response;
    }
    const patients = computed(() => {
        return store.getters['patients/patients']
    })



    return {
        addPatient,
        getPatients,
        patients
    }
}


export default usePatients;