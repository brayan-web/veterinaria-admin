<template>
  <div class="alert  text-center" :class="alertContent.success ? 'alert-success' : 'alert-error' ">
    <span class="text-subtitle1 text-weight-medium">{{ alertContent.txt }}</span>
  </div>
</template>

<script>
export default {
  name: 'AlertText',
  props: {
    alertContent: {
        type: Object,
        required: true
      }
  },  
  
}
</script>

<style scoped>
.alert {
  min-height: 40px;
  width: 560px;
  max-width: 90%;
  border-radius: 12px;
  padding: 10px 22px 10px 20px;
  margin: auto;
  color: #fff;
}

.alert-error {
  background: #ffeff1;
  border: 1px solid #ff5467;
  color: #000;
    font-weight: 600;

}

.alert-success {
    background: #f0fdf2;
    border: 1px solid #4bdd6d;
    color: #000;
    font-weight: 600;
}
</style>
