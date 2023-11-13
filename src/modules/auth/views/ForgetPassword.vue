<template>
  <div class="bg-login">
    <div class="row justify-center items-center">
      <div class="col-12 col-lg-8 col-md-6 col-sm-6 q-pa-lg">
        <div class="text-h3 text-h2-sm text-weight-bolder text-white">
          <span class="text-deep-purple-8"
            >Recupera tu acceso y no Pierdas</span
          >
          tus pacientes
        </div>
      </div>
      <div
        class="col-12 col-lg-4 col-md-6 col-sm-6 q-pa-lg justify-center item-center"
      >
        <div style="max-width: 500px; margin: auto">
          <q-card class="my-card q-pt-sm card-custom">
            <div
              class="text-h5 text-center text-deep-purple-3 text-weight-bold q-mb-lg"
            >
              Recupera tu Contraseña
            </div>

            <q-card-section>
              <q-form class="q-gutter-md" @submit="handlerSubmit">
                <q-input
                  label="Correo"
                  filled
                  dense="dense"
                  color="deep-purple-9"
                  label-color="grey-10"
                  v-model="email"
                  :disable="isLoading"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'El campo es obligaorio',
                    (val) => isValidEmail(val),
                  ]"
                />

                <div class="row justify-between">
                  <div
                    @click="toRegister('login')"
                    class="link-router text-caption text-deep-purple-3 text-weight-light"
                  >
                    ¿Ya tienes una cuenta?, Inicia sesion
                  </div>
                  <div
                    @click="toRegister('register')"
                    class="link-router text-caption text-deep-purple-3 text-weight-light"
                  >
                    ¿No tienes una cuenta?, registrate
                  </div>
                </div>
                <div class="row justify-end">
                  <q-btn
                    unelevated
                    push
                    label="Enviar instrucciones"
                    type="submit"
                    color="deep-purple-10"
                    :loading="isLoading"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar';
import { ref } from "vue";
import { isValidEmail } from "../helpers/validationsInput.js";
import useAuth from "../composables/useAuth";
export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { resetPassword, isLoading } = useAuth();
    const email = ref("brayan@gmail.com");
    
    const handlerSubmit = async() => {
      const { ok, message } = await resetPassword(email.value);
      if (!ok) {
        $q.notify({
          type: 'negative',
          progress: true,
          position: 'top-right',
          message
        })
        return;
      }
      $q.notify({
        type: 'positive',
        progress: true,
        position: 'top-right',
        message
      })
      
      email.value = ''
    };
    
    const toRegister = (name) => {
      router.push({
        name: name,
      });
    };
    return {
      toRegister,
      handlerSubmit,
      email,
      isValidEmail,
      isLoading
    };
  },
};
</script>

<style scoped lang="scss">
.bg-login {
  height: 100vh;
  background-image: linear-gradient(
      to right top,
      rgba(#9578ff, 0.7),
      rgba(#3d08aa, 0.7)
    ),
    url(../../../assets/bg-login.jpg);
  position: relative;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-router {
  cursor: pointer;
}
</style>
