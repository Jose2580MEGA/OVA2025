<template>
  <div class="layout-wrapper">
    <Nuxt /> <AppFooter />
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
.layout-wrapper {
  /* Este ya no necesita flex-grow, ya que #__nuxt lo tiene. */
  /* Solo asegúrate de que ocupe el 100% de su padre */
  width: 100%;
  height: 100%; /* Opcional, si quieres que ocupe todo el espacio vertical del padre */
  display: flex;
  flex-direction: column;
}
</style>