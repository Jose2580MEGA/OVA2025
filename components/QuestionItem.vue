<template>
  <div class="question-item">
    <p class="question-text"><strong>{{ question.text }}</strong></p>
    <div v-if="question.options" class="options-container">
      <label v-for="(option, index) in question.options" :key="index" class="option-label">
        <input type="radio" :name="question.text" :value="option" @change="$emit('answer-selected', option)">
        {{ option }}
      </label>
    </div>
    <div v-else class="text-input-container">
      <input type="text" placeholder="Tu respuesta" class="text-input" @input="$emit('answer-selected', $event.target.value)">
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
  emits: ['answer-selected'],
};
</script>

<style scoped>
.question-item {
  margin-bottom: 15px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.question-text {
  font-size: 1.15em;
  color: #333;
  margin-bottom: 15px;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-label {
  display: block;
  margin-bottom: 5px;
  cursor: pointer;
  color: #555;
  font-size: 1em;
}

.option-label input[type="radio"] {
  margin-right: 10px;
  transform: scale(1.1);
}

.text-input-container {
  margin-top: 10px;
}

.text-input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

.text-input:focus {
  outline: none;
  border-color: magenta;
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 255, 0.25);
}
</style>