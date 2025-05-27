<template>
  <button class="activity-option-button" @click="$emit('click')">
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],
};
</script>

<style scoped>
.activity-option-button {
  padding: 10px 15px;
  font-size: 1em;
  cursor: pointer;
  width: 250px;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.activity-option-button:hover {
  background-color: #e0e0e0;
  border-color: #a0a0a0;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>