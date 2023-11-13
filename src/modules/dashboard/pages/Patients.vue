<template>
  <q-page class="row q-mx-xl q-mt-xl" style="background: #161d31">
    <div class="col col-lg-12">
      <q-toolbar class="bg-toolbar text-white" style="position: relative">
        <q-toolbar-title class="q-ml-xl">
          {{ patients.length > 0 ? 'Listado de Pacientes' : 'Aun no tienes pacientes, empieza añadiendo uno' }}
        </q-toolbar-title>
        <div class="floating__btn">
          <q-btn
            fab
            icon="add"
            @click="openModal()"
            color="deep-purple"
            padding="10px"
          >
            <q-tooltip> agregar paciente </q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
      <modal v-if="isOpen" :isOpen="isOpen">
            <template v-slot:body>
               <Form @on:close="closeModal" :isOpen="isOpen"/>
            </template>
    </modal>
    </div>
    <div class="col col-lg-12">
      {{ patients }}
      <q-table
      flat bordered
      title="Treats"
      :rows="patients"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
          <q-td key="nombreMascota" :props="props">
            {{ props.row.nombre }}
          </q-td>
          <q-td key="nombrePropietario" :props="props">
          
              {{ props.row.propietario }}
         
          </q-td>
          <q-td key="email" :props="props">
          
              {{ props.row.email }}
         
          </q-td>
          <q-td key="fechaAlta" :props="props">
           
              {{ props.row.fecha }}
              
       
          </q-td>
          <q-td key="sintomas" :props="props">
            
              {{ props.row.sintomas }}
      
          </q-td>
          <q-td key="sintomas" :props="props">
        
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import Form from '../components/Form.vue'
import Modal from '../components/Modal.vue';
import usePatients from '../composables/usePatients';
export default {
  components: {
    Form,
    Modal
  },

  setup() {
   const columns = [
      { name: 'nombreMascota', align: 'center', label: 'Nombre de la mascota', field: 'nombreMascota'},
      { name: 'nombrePropietario', label: 'Propietario', field: 'nombrePropietario', sortable: true },
      { name: 'email', label: 'Correo', field: 'email' },
      { name: 'fechaALta', label: 'Fecha de Alta', field: 'fechaAlta' },
      { name: 'sintomas', label: 'sintomas', field: 'sintomas' },
    ]
    const { getPatients, patients } = usePatients();
    const isOpen = ref(false);
    const openModal = () => {
      isOpen.value = true;
    }
    const closeModal = (info) => {
      isOpen.value = false;
      console.log(info)
    }
    
  
      //  getPatients();
   
    
    return {
      isOpen,
      openModal,
      closeModal,
      patients,
      columns

    };
  },
};
</script>

<style scoped>
.bg-toolbar {
  background: #343d55;
}
.floating__btn {
  position: absolute;
  left: -18px;
}
</style>
