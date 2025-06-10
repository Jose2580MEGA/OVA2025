<template>
  <div class="activity-container matching-activity">
    <h2>Matching</h2>
    <p>Escribe la letra de la definición correcta junto a cada palabra.</p>

    <div class="matching-grid" v-if="words.length > 0 && shuffledDefinitions.length > 0">
      <div class="left-column">
        <h3>Palabras</h3>
        <div v-for="(wordItem, index) in words" :key="wordItem.id" class="word-input-box">
          <span class="word-text">{{ wordItem.word }}</span>
          <input
            type="text"
            v-model="userAnswers[index]"
            maxlength="1"
            class="answer-input"
            placeholder="?"
          />
        </div>
      </div>

      <div class="right-column">
        <h3>Definiciones</h3>
        <div v-for="defItem in shuffledDefinitions" :key="defItem.letter" class="definition-box">
          <span class="def-letter">{{ defItem.letter.toUpperCase() }}.</span>
          <span class="def-text">{{ defItem.definition }}</span>
        </div>
      </div>
    </div>
    <div v-else>
        <p>Cargando actividad o no hay datos disponibles...</p>
    </div>

    <button @click="checkAnswers">Verificar Respuestas</button>
    <p v-if="feedback">{{ feedback }}</p>
    <button @click="resetActivity">Reiniciar Actividad</button>
  </div>
</template>

<script>
export default {
  name: 'Matching',
  props: {
    activityData: {
      type: Object,
      required: true,
      default: () => ({ words: [], definitions: [] })
    }
  },
  data() {
    return {
      words: [],
      shuffledDefinitions: [],
      userAnswers: [],
      feedback: '',
    };
  },
  watch: {
    activityData: {
      immediate: true, 
      handler(newVal) {
        console.log('Matching.vue: Watcher de activityData disparado. Nuevo valor:', newVal);
        if (newVal && newVal.words && newVal.words.length > 0 && newVal.definitions && newVal.definitions.length > 0) {
          console.log('Matching.vue: Datos válidos recibidos, inicializando actividad.');
          this.initializeActivity(newVal.words, newVal.definitions);
        } else {
          console.warn('Matching.vue: activityData es nulo o no contiene arrays words/definitions válidos.');
        }
      }
    }
  },
  mounted() {
    console.log('Matching.vue: Componente montado.');
    // También puedes intentar inicializar aquí si el watcher no funciona
    // Pero el watcher con immediate: true debería ser suficiente
    // if (this.activityData && this.activityData.words && this.activityData.words.length > 0) {
    //   this.initializeActivity(this.activityData.words, this.activityData.definitions);
    // }
  },
  methods: {
    initializeActivity(wordsData, definitionsData) {
      console.log('Matching.vue: initializeActivity con wordsData:', wordsData, 'definitionsData:', definitionsData);
      this.words = wordsData;
      this.shuffledDefinitions = this.shuffleArray([...definitionsData]);
      this.userAnswers = Array(this.words.length).fill('');
      this.feedback = '';
      console.log('Matching.vue: Actividad inicializada. Palabras:', this.words.length, 'Definiciones barajadas:', this.shuffledDefinitions.length);
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    checkAnswers() {
      let correctCount = 0;
      this.words.forEach((wordItem, index) => {
        const userAnswer = this.userAnswers[index].trim().toLowerCase();
        if (userAnswer === wordItem.answerLetter.toLowerCase()) {
          correctCount++;
        }
      });

      this.feedback = `Respuestas correctas: ${correctCount} de ${this.words.length}.`;
      this.$emit('activity-completed', {
        activityName: 'Matching',
        totalQuestions: this.words.length,
        correctAnswers: correctCount,
      });
      console.log('Matching.vue: Respuestas verificadas. Resultados:', this.feedback);
    },
    resetActivity() {
      console.log('Matching.vue: Reiniciando actividad.');
      this.initializeActivity(this.activityData.words, this.activityData.definitions);
      this.feedback = '';
    }
  },
};
</script>

<style scoped>
/* Estilos para el nuevo formato de Matching */
.activity-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: rgb(0, 145, 255);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 900px;
  margin: 20px auto;
  color: white;
}

h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: rgb(255, 216, 0);
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.matching-grid {
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 30px;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 45%;
}

.left-column h3, .right-column h3 {
  font-size: 1.5em;
  color: rgb(255, 216, 0);
  margin-bottom: 10px;
  text-align: center;
}

.word-input-box {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 1.1em;
  font-weight: bold;
}

.word-text {
  flex-grow: 1;
  text-align: left;
  margin-right: 10px;
}

.answer-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.answer-input:focus {
  outline: none;
  border-color: rgb(0, 145, 255);
}

.definition-box {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 1.1em;
}

.def-letter {
  font-weight: bold;
  margin-right: 10px;
  color: rgb(0, 145, 255);
  flex-shrink: 0;
}

.def-text {
  flex-grow: 1;
  text-align: left;
}

button {
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: magenta;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgb(0, 145, 255);
}

p.feedback {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: yellow;
}
</style>