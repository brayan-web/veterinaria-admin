<template>
  <div class="bg-login">
    <div class="row justify-center items-center">
      <div class="col-12 col-lg-6 col-md-6 col-sm-6 q-pa-lg">
        <div class="text-h3 text-h2-sm text-weight-bolder text-white">
          <span class="text-deep-purple-8"
            >Confirma tu Cuenta y Comienza a Administrar
          </span>
          tus Pacientes
        </div>
      </div>
      <div
        class="col-12 col-lg-6 col-md-6 col-sm-6 q-pa-lg justify-center item-center"
      >
        <q-card class="my-card">
          <q-card-section v-if="isLoading" class="text-center">
            <q-spinner color="deep-purple-10" size="3em" />
          </q-card-section>

          <q-card-section v-if="!isLoading">
            <AlertText :alertContent="alertContent" />
          </q-card-section>
          <q-card-section v-if="!isLoading && isAccountConfirmed" class="text-center">
            <q-btn
              color="deep-purple-10"
              unelevated
              @click="goToLogin"
              label="iniciar sesion"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from 'quasar';
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth";
import AlertText from "../../../components/AlertText.vue";
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
    const $q = useQuasar();
    const { confirmAccount, isLoading } = useAuth();
    const router = useRouter();
    const isAccountConfirmed = ref(false);
    const alertContent = ref({
      success: true,
      txt: "",
    });
    const onConfirmAccount = async () => {
      const { ok, message } = await confirmAccount(props.token);
      if (!ok) {
        alertContent.value.txt = message;
        alertContent.value.success = ok;
        return;
      }
      isAccountConfirmed.value = true;
      alertContent.value.txt = message;
      alertContent.value.success = ok;
    };

    const goToLogin = () => {
      router.push({
        name: 'login'
      })
    }

    onConfirmAccount();
    return {
      alertContent,
      isLoading,
      isAccountConfirmed,
      goToLogin
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
