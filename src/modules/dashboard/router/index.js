export default {
    name: "dashboard",
    component: () =>
      import(
        /*webpackChunkName: "dashboard"*/ "../layouts/DashboardLayout.vue"
      ),
      children: [
        {
          path: '',
          name: 'dashboard-index',
          component: () =>   import(
            /*webpackChunkName: "IndexPage"*/ "../pages/IndexPageDashboard.vue"
          ),
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () =>   import(
            /*webpackChunkName: "perfil"*/ "../pages/Perfil.vue"
          ),
        },
        {
          path: 'pacientes',
          name: 'pacientes',
          component: () =>   import(
            /*webpackChunkName: "pacientes"*/ "../pages/Patients.vue"
          ),
        },
      ]
  };
  