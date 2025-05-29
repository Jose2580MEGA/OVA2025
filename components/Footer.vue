<template>
  <footer class="app-footer">
    <p>Proyecto de Cuarto Semestre</p>
    <img src="/logo-universidad.png" alt="Logo de la Universidad" class="university-logo" />
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style>
/* components/Footer.vue */
.app-footer {
  width: 100%;
  padding: 20px 0;
  background-color: #333; /* Color oscuro para el footer */
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  height: 60px; /* Altura fija para el footer */
  box-sizing: border-box;
}

.app-footer p {
  margin: 0;
  font-size: 1em;
}

.university-logo {
  height: 40px; /* Ajusta el tamaño del logo */
  object-fit: contain;
}
</style>