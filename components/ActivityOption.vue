<template>
  <button @click="$emit('click')" style="padding: 8px 12px; font-size: 14px; cursor: pointer; width: 200px; text-align: left;">
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