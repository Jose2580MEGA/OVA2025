<template>
  <div>
    <Nuxt />
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/Footer.vue';

export default {
  components: {
    AppFooter,
  },
};
</script>

<style>
/* layouts/default.vue */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Evita el scroll global */
}

/* Asegúrate de que el contenido principal ocupe el espacio restante */
#app { /* O el id de tu elemento raíz */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>