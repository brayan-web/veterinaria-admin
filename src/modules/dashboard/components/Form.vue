<template>
    <q-card class="shadow-24" style="background: #283046; min-width: 550px">
      <q-card-section style="background: #343d55">
        <h4 class="text-h5 text-grey-5 q-my-sm">Agregar paciente</h4>
      </q-card-section>
      <q-card-section>
        <q-form @submit="handlerSubmit">
          <div>
            <q-input
              v-model="pacienteForm.nombreMascota"
              color="deep-purple"
              bg-color="white"
              outlined
              label="NOMBRE DE LA MASCOTA"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'El campo es obligatorio',
              ]"
            />
          </div>
          <div class="q-mt-md">
            <q-input
              color="deep-purple"
              outlined
              bg-color="white"
              v-model="pacienteForm.nombrePropietario"
              label="NOMBRE DEL PROPIETARIO"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'El campo es obligatorio',
              ]"
            />
          </div>
          <div class="q-mt-md">
            <q-input
              color="deep-purple"
              outlined
              bg-color="white"
              v-model="pacienteForm.emailPropietario"
              label="EMAIL DEL PROPIETARIO"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'El campo es obligatorio',
                (val) => isValidEmail(val),
              ]"
            />
          </div>

          <div class="q-mt-md">
            <q-input
              outlined
              bg-color="white"
              
              color="deep-purple"
              v-model="pacienteForm.fechaAlta"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="pacienteForm.fechaAlta"
                      color="deep-purple"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="deep-purple"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div style="max-width: 300px">
            <q-input
              v-model="pacienteForm.sintomas"
              label="SINTOMAS"
              color="deep-purple"
              type="textarea"
              outlined
              bg-color="white"
              :rules="[
                (val) => (val && val.length > 0) || 'El campo es obligatorio',
              ]"
            />
          </div>
          <q-card-actions align="right">
            <q-btn color="negative" label="Cancelar" @click="closeModal()" />
            <q-btn
              color="deep-purple"
              type="submit"
              label="Agregar"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
</template>

<script>
import { ref, watch } from "vue";
import { useQuasar } from 'quasar';
const moment = require('moment');
import { isValidEmail } from "../../auth/helpers/validationsInput";
import usePatients from "../composables/usePatients"
export default {
  emits: ["on:close"],
  props: {
    isOpen:{
      type: Boolean,
      required: true
    }
  },
  setup(props, {emit},) {
    const pacienteForm = ref({
      nombreMascota: "hook",
      nombrePropietario: "guardian",
      emailPropietario: "asdas@gmail.com",
      fechaAlta: moment().format('YYYY/MM/DD'),
      sintomas: "",
    });
    const $q = useQuasar()

    const { addPatient } = usePatients();
    const handlerSubmit = async() => {
      const { ok, message } = await addPatient(pacienteForm.value);
      if(!ok){
        $q.notify({
            type: 'negative',
            progress: true,
            position: 'top-right',
            message
          })
        return
      }
      $q.notify({
        type: 'positive',
        progress: true,
        position: 'top-right',
        message
      })

      closeModal();
    };
    function closeModal() {
      emit('on:close', "hola")
    }
    return {
      isValidEmail,
      handlerSubmit,
      pacienteForm,
      closeModal
    };
  },
};
</script>
