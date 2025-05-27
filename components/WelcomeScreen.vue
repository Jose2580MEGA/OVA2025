<template>
  <div class="welcome-screen">
    <h1>Bienvenido a este Objeto Virtual de Aprendizaje</h1>
    <button class="welcome-button" @click="$emit('enter')">Entrar</button>
  </div>
</template>

<script>
export default {
  emits: ['enter'],
};
</script>

<style scoped>
.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 97.5vh;
  background-color: dimgray;
  color: white;
  text-align: center;
}

.welcome-screen h1 {
  margin-bottom: 30px;
  font-size: 3em;
}

.welcome-button {
  padding: 15px 30px;
  font-size: 1.2em;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: rgb(255, 0, 255);
  color: white;
  transition: background-color 0.3s ease;
}

.welcome-button:hover {
  background-color: rgb(0, 0, 0);
}
</style>