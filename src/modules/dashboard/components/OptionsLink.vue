<template>
    <q-item
      clickable
      tag="a"
      @click="navigateTo"
    >
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon :name="icon" color=""/>
      </q-item-section>
  
      <q-item-section>
        <q-item-label >{{ title }}</q-item-label>
        <q-item-label caption class="text-white text-weight-light">{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  export default {
    name: 'OptionsLink',
    props: {
      title: {
        type: String,
        required: true
      },
  
      caption: {
        type: String,
        default: ''
      },
  
      link: {
        type: String,
        default: '#'
      },
  
      icon: {
        type: String,
        default: ''
      }
    },

    setup(props){

        const router = useRouter();
        const navigateTo = () => {
            router.push({
                name: props.link
            })
        }

        return{
            navigateTo
        }
    }
  }
  </script>
  