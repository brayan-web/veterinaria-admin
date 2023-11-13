<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary q-mx-xl q-my-lg rounded-borders">
      <q-toolbar class="q-pa-md">
        <q-btn
          flat
          dense
          round
          icon="menu"
          color="deep-purple"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          APV
        </q-toolbar-title>

        <div class="row menu-perfil">
          <div class="column q-mx-md text-right q-gutter-none">
          <span class="text-h6 text-weight-medium text-grey-5 line"
            >John doe</span
          >
          <span class="text-subtitle1 text-weight-light text-grey-5 line"
            >jong@gmail.com</span
          >
        </div>
        <q-avatar size="48px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
          <q-badge color="green" rounded floating />
          
        </q-avatar>
        
    <q-menu class="bg-primary text-grey-5" fit>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section class="row"> <span class="text-subtitle1"><q-icon name="person" color="grey-5" class="q-pr-sm" /> Perfil</span></q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section ><span class="text-subtitle1" ><q-icon name="logout" color="grey-5" class="q-pr-sm" />Cerrar sesion</span></q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </div>
      </q-toolbar>
    </q-header>




    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-primary">
      <q-list>
     
        <q-item-label header class="text-white"> Dashboard </q-item-label>

        <OptionsLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          class="text-white"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import OptionsLink from "../components/OptionsLink.vue";
import { useRouter } from "vue-router";
import useAuth from "../../../modules/auth/composables/useAuth";
import usePatients from "../../../modules/dashboard/composables/usePatients";
const linksList = [
  {
    title: "Perfil",
    caption: "detalles del perfil",
    icon: "manage_accounts",
    link: "perfil",
  },
  {
    title: "Pacientes",
    caption: "añade un nuevos paciente",
    icon: "person_add",
    link: "pacientes",
  },
  // {
  //   title: "Listado de Pacientes",
  //   caption: "listado de todos los pacientes",
  //   icon: "group",
  //   link: "pacientes",
  // },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    OptionsLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const { logOut } = useAuth();
    const { getPatients } = usePatients();
    const onLogOut = () => {
      console.log("hola")
      router.push({
        name: "login",
      });
      logOut();
    };
    getPatients();
    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      onLogOut,
    };
  },
});
</script>

<style scoped>
.line {
  line-height: 20px;
}
.menu-perfil{
  cursor: pointer;
}
</style>
