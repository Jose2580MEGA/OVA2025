<template>
  <div class="main-interface">
    <h1 class="main-title">OVA Inglés</h1>
    <div class="menu-buttons">
      <button class="menu-button" @click="$emit('show-contents')">Contenidos</button>
      <button class="menu-button" @click="$emit('show-activities')">Actividades</button>
      <button class="menu-button" @click="$emit('show-evaluation')">Evaluación</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['show-contents', 'show-activities', 'show-evaluation'],
};
</script>

<style scoped>
.main-interface {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: dimgray;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 800px;
}

.main-title {
  margin-bottom: 30px;
  font-size: 2.5em;
}

.menu-buttons {
  display: flex;
  gap: 25px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.menu-button {
  padding: 12px 25px;
  font-size: 1.1em;
  cursor: pointer;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 6px;
  background-color: black;
  color: white;
  transition: all 0.3s ease;
  min-width: 150px;
}

.menu-button:hover {
  background-color: rgb(0, 145, 255);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(0, 145, 255);
}
</style>