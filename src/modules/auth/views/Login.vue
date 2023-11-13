<template>
  <div class="bg-login">
    <div class="row justify-center items-center">
      <div class="col-12 col-lg-8 col-md-6 col-sm-6 q-pa-lg">
        <div class="text-h3 text-h2-sm text-weight-bolder text-white">
          Inicia Sesion y Administra tus
          <span class="text-deep-purple-8">Pacientes</span>
        </div>
      </div>
      <div
        class="col-12 col-lg-4 col-md-6 col-sm-6 q-pa-lg justify-center item-center"
      >
        <div style="margin: auto">
          <q-card class="my-card q-pt-sm">
            <div
              class="text-h5 text-center text-deep-purple-3 text-weight-bold q-mb-lg"
            >
              BIENVENIDO
            </div>

            <q-card-section>
              <q-form class="q-gutter-md" @submit="handleSubmit">
                <q-input
                  label="Correo"
                  v-model="loginForm.email"
                  filled
                  dense="dense"
                  color="deep-purple-9"
                  label-color="grey-10"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'El campo es obligatorio',
                    (val) => isValidEmail(val),
                  ]"
                />

                <q-input
                  label="Contraseña"
                  v-model="loginForm.password"
                  filled
                  dense="dense"
                  color="deep-purple-9"
                  label-color="grey-10"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'El campo es obligatorio',
                  ]"
                />
                <div class="row justify-between">
                  <div
                    @click="toRegister('recuperar-password')"
                    class="link-router text-caption text-deep-purple-3 text-weight-light"
                  >
                    Olvidaste tu contraseña?
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
                    label="Entrar"
                    type="submit"
                    color="deep-purple-10"
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
import {  isValidEmail, pswShort } from "../helpers/validationsInput"
import useAuth from '../composables/useAuth'
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { loginUser } = useAuth();
    const loginForm = ref({
      email: '',
      password: ''
    })
    const handleSubmit = async() => {

    const { ok, message } =  await loginUser(loginForm.value);
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

      router.push({name: 'dashboard-index'})
    }
    const toRegister = (name) => {
      router.push({
        name: name,
      });
    };
    return {
      isPwd: ref(true),
      toRegister,
      isValidEmail,
      pswShort,
      handleSubmit,
      loginForm
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
.txt-custom {
  color: #3d08aa;
}
.link-router {
  cursor: pointer;
}
</style>
