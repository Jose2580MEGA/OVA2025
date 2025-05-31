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
  background-color: #333;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  height: 60px; /* Mantén una altura fija */
  box-sizing: border-box;
  flex-shrink: 0; /* Evita que se encoja */
  margin-top: auto; /* ¡Esto es crucial si está en el mismo contexto flex que el contenido principal! */
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