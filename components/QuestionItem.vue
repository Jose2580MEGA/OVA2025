<template>
  <div>
    <p><strong>{{ question.text }}</strong></p>
    <div v-if="question.options">
      <label v-for="(option, index) in question.options" :key="index" style="display: block; margin-bottom: 5px;">
        <input type="radio" :name="question.text" :value="option"> {{ option }}
      </label>
    </div>
    <div v-else>
      <input type="text" placeholder="Tu respuesta">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
};
</script>