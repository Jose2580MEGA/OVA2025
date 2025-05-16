<template>
  <div style="display: flex; flex-direction: column; align-items: center; padding: 20px;">
    <h2>Menú Principal</h2>
    <div style="display: flex; gap: 20px; margin-top: 20px;">
      <button @click="$emit('show-contents')" style="padding: 10px 15px; font-size: 14px; cursor: pointer;">Contenidos</button>
      <button @click="$emit('show-activities')" style="padding: 10px 15px; font-size: 14px; cursor: pointer;">Actividades</button>
      <button @click="$emit('show-evaluation')" style="padding: 10px 15px; font-size: 14px; cursor: pointer;">Evaluación</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['show-contents', 'show-activities', 'show-evaluation'],
};
</script>