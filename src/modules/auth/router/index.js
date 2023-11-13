export default {
    name: 'auth',
    component: () => import(/*webpackChunkName: "auth"*/ '../../../modules/auth/layouts/AuthLAyout.vue'),
    children: [
        {
          path: '',
          name: 'login',
          component: () =>   import(
            /*webpackChunkName: "login"*/ "../../../modules/auth/views/Login.vue"
          ),
        },
        {
          path: '/register',
          name: 'register',
          component: () =>   import(
            /*webpackChunkName: "register"*/ "../../../modules/auth/views/Register.vue"
          ),
        },
        {
          path: '/recuperar-password',
          name: 'recuperar-password',
          component: () =>   import(
            /*webpackChunkName: "recuperar-password"*/ "../../../modules/auth/views/ForgetPassword.vue"
          ),
        },
        {
          path: '/confirmar/:token',
          name: 'confirmar',
          component: () =>   import(
            /*webpackChunkName: "confirmar"*/ "../../../modules/auth/views/ConfirmedAccount.vue"
          ),
          props: (route) => {
            return {
              token: route.params.token
            }
          }
        },
        {
          path: '/nuevo-password/:token',
          name: 'nuevo-password',
          component: () =>   import(
            /*webpackChunkName: "nuevo-password"*/ "../../../modules/auth/views/NewPassword.vue"
          ),
          props: (route) => {
            return {
              token: route.params.token
            }
          }
        }
      ]
}