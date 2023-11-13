<template>
  <div class="bg-login">
    <div class="row justify-center items-center">
      <div class="col-12 col-lg-8 col-md-6 col-sm-6 q-pa-lg">
        <div class="text-h3 text-h2-sm text-weight-bolder text-white">
          <span class="text-deep-purple-8"
            >Recupera tu password y no Pierdas Acceso a</span
          >
          tus pacientes
        </div>
      </div>
      <div
        class="col-12 col-lg-4 col-md-6 col-sm-6 q-pa-lg justify-center item-center"
      >
        <div style="max-width: 500px; margin: auto">
          <q-card class="my-card q-pt-sm card-custom">
            <q-card-section v-if="isLoading" class="text-center">
              <q-spinner color="deep-purple-10" size="3em" />
            </q-card-section>
            <q-card-section v-else>
              <AlertText  :alertContent="alertContent" />
              <q-form class="q-gutter-md q-mt-auto" @submit="handlerSubmit" v-if="isValidToken">
                <q-input
                  label="Nueva Contraseña"
                  filled
                  :disable="isLoading"
                  dense="dense"
                  color="deep-purple-9"
                  label-color="grey-10"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="password"
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
                <div class="row justify-end">
                  <q-btn
                    unelevated
                    push
                    label="Guardar Nuevo Password"
                    type="submit"
                    color="deep-purple-10"
                    :loading="isLoading"
                  />
                </div>
              </q-form>

              <!-- <q-btn
              color="deep-purple-10"
              unelevated
              @click="goToLogin"
              label="iniciar sesion"
              v-if="isConfirmedPassword"
              class="q-mt-auto"
            /> -->
            </q-card-section>
            <q-card-section  class="text-center">
            
        
          </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import useAuth from "../composables/useAuth";
import AlertText from "../../../components/AlertText.vue";
import { pswShort } from "../helpers/validationsInput";
import { useRouter } from "vue-router";
export default {
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  components: {
    AlertText,
  },
  setup(props) {
    const { validateTokenPassword, isLoading, sendNewPassword } =
      useAuth();
    const isConfirmedPassword = ref(false)
    const password = ref("");
    const alertContent = ref({
      success: true,
      txt: "",
    });
    const isValidToken = ref(false)
    const router = useRouter();
    watch(
      () => props.token,
      () => onComprobarToken(props.token)
    );
    const handlerSubmit = async () => {
      const { ok, message } = await sendNewPassword(props.token, password.value);
      if (!ok) {
      isConfirmedPassword.value = false
        alertContent.value.txt = message;
        alertContent.value.success = ok;

        return;
      }
      isConfirmedPassword.value = true
      alertContent.value.txt = message;
      alertContent.value.success = ok;

      password.value = '';

      setTimeout(() => {
        router.push({
        name: 'login',
      });
      }, 3000)
    };
    const onComprobarToken = async () => {
      const { ok, message } = await validateTokenPassword(props.token);
      if (!ok) {
      isValidToken.value = false;
        alertContent.value.txt = message;
        alertContent.value.success = ok;
        return;
      }
      isValidToken.value = true;
      alertContent.value.txt = message;
      alertContent.value.success = ok;
    };
    const goToLogin = () => {
      router.push({
        name: 'login'
      })
    }
    onComprobarToken();
    return {
      pswShort,
      isPwd: ref(true),
      handlerSubmit,
      password,
      alertContent,
      isLoading,
      goToLogin,
      isValidToken,
      isConfirmedPassword
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
