<template>
  <div class="bg-login">
    <div class="row justify-center items-center">
      <div class="col-12 col-lg-6 col-md-6 col-sm-6 q-pa-lg">
        <div class="text-h3 text-h2-sm text-weight-bolder text-white">
          <span class="text-deep-purple-8">Crea tu cuenta y Administra</span>
          tus pacientes
        </div>
      </div>
      <div
        class="col-12 col-lg-6 col-md-6 col-sm-6 q-pa-lg justify-center item-center"
      >
        <div style="margin: auto">
          <q-card class="my-card q-pt-sm">
            <div
              class="text-h5 text-center text-deep-purple-3 text-weight-bold q-mb-lg"
            >
              REGISTRATE
            </div>

            <q-card-section>
              <q-form @submit="handleSubmit" @reset="resetForm" class="q-gutter-md">
                <q-input
                  label="Nombre"
                  filled
                  dense="dense"
                  color="deep-purple-9"
                  label-color="grey-10"
                  v-model="userForm.name"
                  :disable="isLoading"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'El campo es obligatorio',
                  ]"
                />
                <q-input
                  label="Correo"
                  filled
                  type="email"
                  dense="dense"
                  color="deep-purple-9"
                  label-color="grey-10"
                  v-model="userForm.email"
                  :disable="isLoading"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'El campo es obligatorio',
                    (val) => isValidEmail(val),
                  ]"
                />
                <q-input
                  label="Contraseña"
                  filled
                  dense="dense"
                  color="deep-purple-9"
                  label-color="grey-10"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="userForm.password"
                  :disable="isLoading"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'El campo es obligatorio',
                    (val) => pswShort(val),
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <q-input
                  label="Repetir Contraseña"
                  filled
                  dense="dense"
                  color="deep-purple-9"
                  label-color="grey-10"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="userForm.confirmPassword"
                  :disable="isLoading"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'El campo es obligatorio',
                    (val) => isSamePsw(val, userForm.password),
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div class="row justify-end">
                  <div
                    @click="goToLogin"
                    class="link-router text-caption text-deep-purple-3 text-weight-light"
                  >
                    ¿Ya tienes una cuenta?, Inicia sesion
                  </div>
                </div>
                <div class="row justify-end">
                  <q-btn
                    unelevated
                    push
                    label="Registar"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar';
import { isSamePsw, isValidEmail, pswShort } from "../helpers/validationsInput"
import useAuth from "../composables/useAuth";
export default {
  setup() {
    const $q = useQuasar()
    const userForm = ref({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const router = useRouter();
    const { createUser, isLoading } = useAuth();
    const handleSubmit = async () => {
      const { ok, message } = await createUser(userForm.value);
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

      
        resetForm();
    };

    const resetForm = () => {
      userForm.value.name = "";
      userForm.value.email =  "";
      userForm.value.password =  "";
      userForm.value.confirmPassword =  "";
    }

    const goToLogin = () => {
      router.push({
        name: 'login'
      })
    }

    return {
      goToLogin,
      handleSubmit,
      isLoading,
      isPwd: ref(true),
      isSamePsw,
      isValidEmail,
      pswShort,
      resetForm,
      userForm,
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
