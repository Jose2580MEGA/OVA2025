<template>
  <div class="welcome-container">
    <h1>¡Bienvenido a OVA Inglés!</h1>
    <button @click="$emit('start')">Entrar</button>
  </div>
</template>

<script>
export default {
  name: 'WelcomeScreen',
};
</script>

<style>
/* components/WelcomeScreen.vue */
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px); /* Ajusta según el tamaño del footer */
  text-align: center;
  background-color: #f0f8ff; /* Color de fondo suave */
  padding: 20px;
  box-sizing: border-box;
}

.welcome-container h1 {
  margin-bottom: 30px;
  font-size: 2.5em;
}

.welcome-container button {
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: rgb(0, 145, 255); /* Azul */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.welcome-container button:hover {
  background-color: rgb(0, 100, 200); /* Azul más oscuro al pasar el ratón */
}
</style>