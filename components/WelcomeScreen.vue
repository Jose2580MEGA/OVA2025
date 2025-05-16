<template>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f0f0f0;">
    <h1>¡Bienvenido!</h1>
    <button @click="$emit('enter')" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Entrar</button>
  </div>
</template>

<script>
export default {
  emits: ['enter'],
};
</script>