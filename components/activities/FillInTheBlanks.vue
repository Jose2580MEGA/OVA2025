<template>
  <div class="activity-container fill-in-the-blanks-activity">
    <h2>Actividad: Completa los Espacios</h2>
    <p>Escribe la forma correcta en pasado del verbo entre paréntesis.</p>

    <div v-if="questions.length > 0">
        <div v-for="(question, index) in questions" :key="question.id" class="question-item">
            <p>
                {{ question.sentence.split('___')[0] }}
                <input
                    type="text"
                    v-model="userAnswers[index]"
                    :placeholder="`Verbo base: ${question.sentence.match(/\((.*?)\)/)[1]}`"
                    class="fill-input"
                />
                {{ question.sentence.split('___')[1] }}
            </p>
        </div>
    </div>
    <div v-else>
        <p>Cargando actividad o no hay preguntas disponibles...</p>
    </div>

    <button @click="checkAnswers">Verificar Respuestas</button>
    <p v-if="feedback">{{ feedback }}</p>
    <button @click="resetActivity">Reiniciar Actividad</button>
  </div>
</template>

<script>
export default {
  name: 'FillInTheBlanks',
  props: {
    // 1. Define la prop 'activityData' para recibir el array de preguntas
    activityData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      questions: [],
      userAnswers: [],
      feedback: '',
    };
  },
  watch: {
    // 2. Usa un watcher para reaccionar cuando 'activityData' cambie o se reciba inicialmente
    activityData: {
      immediate: true, // Esto hace que el watcher se ejecute una vez cuando el componente se monta
      handler(newVal) {
        // console.log('FillInTheBlanks.vue: Watcher de activityData disparado. Nuevo valor:', newVal); // DEBUG
        if (newVal && newVal.length > 0) {
          // console.log('FillInTheBlanks.vue: Datos válidos recibidos, inicializando actividad.'); // DEBUG
          this.initializeActivity(newVal);
        } else {
          // console.warn('FillInTheBlanks.vue: activityData es nulo o vacío.'); // DEBUG
          this.questions = []; // Asegura que las preguntas estén vacías si no hay datos
          this.userAnswers = [];
        }
      }
    }
  },
  methods: {
    // 3. Ajusta initializeActivity para usar los datos pasados por la prop
    initializeActivity(data) {
      this.questions = data;
      this.userAnswers = Array(this.questions.length).fill('');
      this.feedback = '';
      // console.log('FillInTheBlanks.vue: Actividad inicializada. Preguntas:', this.questions.length); // DEBUG
    },
    checkAnswers() {
      let correctCount = 0;
      this.questions.forEach((q, index) => {
        if (this.userAnswers[index] && this.userAnswers[index].trim().toLowerCase() === q.answer.toLowerCase()) {
          correctCount++;
        }
      });
      this.feedback = `Respuestas correctas: ${correctCount} de ${this.questions.length}.`;
      this.$emit('activity-completed', {
        activityName: 'Fill In The Blanks',
        totalQuestions: this.questions.length,
        correctAnswers: correctCount,
      });
      // console.log('FillInTheBlanks.vue: Respuestas verificadas. Resultados:', this.feedback); // DEBUG
    },
    // 3. Ajusta resetActivity para usar los datos pasados por la prop
    resetActivity() {
      // console.log('FillInTheBlanks.vue: Reiniciando actividad.'); // DEBUG
      this.initializeActivity(this.activityData); // Reinicia con los datos originales de la prop
      this.feedback = '';
    },
  },
};
</script>

<style scoped>
/* Estilos de FillInTheBlanks.vue */
.activity-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: rgb(0, 145, 255); /* Azul */
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
  color: white;
}

h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: rgb(255, 216, 0); /* Amarillo */
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.question-item {
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
}

.question-item p {
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* Para que el input y texto se envuelvan si la pantalla es pequeña */
  margin-bottom: 0;
  font-size: 1.1em;
}

.fill-input {
  flex-grow: 1;
  min-width: 150px;
  margin: 0 10px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  color: #333; /* Color de texto para el input */
}

.fill-input::placeholder {
    color: #999; /* Color de placeholder */
}

.fill-input:focus {
  outline: none;
  border-color: rgb(0, 145, 255);
}

button {
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: magenta; /* Magenta para los botones de acción */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgb(0, 145, 255)
}

p.feedback {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: yellow;
}
</style>