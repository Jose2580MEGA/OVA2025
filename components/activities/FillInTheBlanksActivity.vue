<template>
  <div class="fill-in-the-blanks-activity">
    <h3 class="activity-header">{{ activityData.title }}</h3>
    <p class="instruction-text">Completa los espacios en blanco.</p>

    <div class="text-display" v-html="formattedText"></div>

    <div v-if="activityData.type === 'drag-and-drop'" class="word-bank-container">
      <h4>Banco de Palabras:</h4>
      <div class="word-bank">
        <div
          v-for="(word, index) in shuffledWordBank"
          :key="index"
          class="draggable-word"
          draggable="true"
          @dragstart="startDrag(word)"
          :class="{ 'used-word': usedWords.includes(word) }"
        >
          {{ word }}
        </div>
      </div>
    </div>

    <div class="buttons-container">
      <button @click="checkAnswers" class="submit-button">Verificar Respuestas</button>
      <button @click="$emit('go-back')" class="back-button">Volver</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activityData: {
      type: Object,
      required: true,
      default: () => ({
        title: 'Rellenar Espacios',
        type: 'text-input', // 'drag-and-drop', 'select', 'text-input'
        text: '',
        blanks: [],
        wordBank: [], // Solo para drag-and-drop
      })
    }
  },
  data() {
    const userAnswers = {};
    const usedWords = []; // Para drag-and-drop
    const shuffledWordBank = this.activityData.type === 'drag-and-drop'
      ? this.shuffleArray([...this.activityData.wordBank])
      : [];

    return {
      userAnswers,
      usedWords,
      shuffledWordBank,
      draggingWord: null,
    };
  },
  computed: {
    formattedText() {
      let text = this.activityData.text;
      this.activityData.blanks.forEach(blank => {
        const placeholder = `[${blank.correct}]`;
        let replacementHtml = '';

        if (this.activityData.type === 'drag-and-drop') {
          const droppedWord = this.userAnswers[blank.id] || '';
          replacementHtml = `<span
              class="blank-drop-zone"
              data-blank-id="${blank.id}"
              @dragover.prevent @drop="onDrop(${blank.id}, $event)"
              @dragenter.prevent @dragleave.prevent
              :class="{ 'has-answer': droppedWord }"
            >${droppedWord || '________'}</span>`;
        } else if (this.activityData.type === 'select') {
          replacementHtml = `<select class="blank-select" data-blank-id="${blank.id}" @change="handleSelect(${blank.id}, $event)">
            <option value="">Selecciona...</option>
            ${blank.options.map(opt => `<option value="${opt}" ${this.userAnswers[blank.id] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
          </select>`;
        } else { // text-input
          replacementHtml = `<input type="text" class="blank-input" data-blank-id="${blank.id}"
            value="${this.userAnswers[blank.id] || ''}"
            @input="handleTextInput(${blank.id}, $event)"
            placeholder="Escribe aquí"
          />`;
        }
        text = text.replace(placeholder, replacementHtml);
      });
      return text;
    }
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    startDrag(word) {
      this.draggingWord = word;
    },
    onDrop(blankId, event) {
      event.preventDefault();
      if (this.draggingWord && !this.usedWords.includes(this.draggingWord)) {
        // Si ya hay una palabra en ese blank, devolverla al banco
        if (this.userAnswers[blankId]) {
          this.usedWords = this.usedWords.filter(word => word !== this.userAnswers[blankId]);
        }

        this.$set(this.userAnswers, blankId, this.draggingWord);
        this.usedWords.push(this.draggingWord);
        this.draggingWord = null;
      }
    },
    handleSelect(blankId, event) {
      this.$set(this.userAnswers, blankId, event.target.value);
    },
    handleTextInput(blankId, event) {
      this.$set(this.userAnswers, blankId, event.target.value);
    },
    checkAnswers() {
      let correctCount = 0;
      const totalBlanks = this.activityData.blanks.length;

      this.activityData.blanks.forEach(blank => {
        const userAnswer = this.userAnswers[blank.id];
        if (userAnswer && userAnswer.toLowerCase() === blank.correct.toLowerCase()) {
          correctCount++;
        }
      });

      const score = (correctCount / totalBlanks) * 100;
      alert(`Actividad de Rellenar Espacios completada. Tienes ${correctCount} de ${totalBlanks} respuestas correctas. Puntaje: ${score.toFixed(2)}%`);

      this.$emit('activity-completed', {
        activityId: this.activityData.title,
        score: score.toFixed(2),
        details: { correctCount, totalBlanks }
      });
    }
  },
  mounted() {
    // Escucha eventos de drop en los blanks para drag-and-drop
    if (this.activityData.type === 'drag-and-drop') {
      this.$nextTick(() => {
        const dropZones = this.$el.querySelectorAll('.blank-drop-zone');
        dropZones.forEach(zone => {
          zone.addEventListener('dragover', (e) => e.preventDefault());
          zone.addEventListener('drop', (e) => {
            e.preventDefault();
            const blankId = zone.dataset.blankId;
            this.onDrop(blankId, e);
          });
        });
      });
    }
    // Escucha eventos de cambio para select y input
    if (this.activityData.type === 'select') {
      this.$nextTick(() => {
        const selects = this.$el.querySelectorAll('.blank-select');
        selects.forEach(sel => {
          sel.addEventListener('change', (e) => {
            const blankId = sel.dataset.blankId;
            this.handleSelect(blankId, e);
          });
        });
      });
    } else if (this.activityData.type === 'text-input') {
      this.$nextTick(() => {
        const inputs = this.$el.querySelectorAll('.blank-input');
        inputs.forEach(input => {
          input.addEventListener('input', (e) => {
            const blankId = input.dataset.blankId;
            this.handleTextInput(blankId, e);
          });
        });
      });
    }
  }
};
</script>

<style scoped>
.fill-in-the-blanks-activity {
  padding: 30px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 900px;
  text-align: center;
}

.activity-header {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2.2em;
}

.instruction-text {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 30px;
}

.text-display {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 25px;
  line-height: 2.5; /* Espacio para los inputs/selects */
  font-size: 1.1em;
  text-align: left;
}

/* Estilos para los elementos insertados dinámicamente */
.text-display >>> .blank-input,
.text-display >>> .blank-select,
.text-display >>> .blank-drop-zone {
  vertical-align: middle;
  margin: 0 5px;
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
  display: inline-block;
  min-width: 100px;
  text-align: center;
  color: #333;
  background-color: #e6f7ff; /* Fondo claro para los blanks */
}

.text-display >>> .blank-input:focus,
.text-display >>> .blank-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.text-display >>> .blank-drop-zone {
  border-style: dashed;
  background-color: #e0e0e0;
  cursor: default;
  min-width: 120px;
  color: #777;
}

.text-display >>> .blank-drop-zone.has-answer {
  border-style: solid;
  background-color: #d4edda;
  color: #28a745;
  font-weight: bold;
}


.word-bank-container {
  margin-top: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

.word-bank-container h4 {
  margin-top: 0;
  color: #34495e;
  font-size: 1.4em;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.word-bank {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.draggable-word {
  background-color: #ffebd4;
  border: 1px solid #ff9900;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: grab;
  font-weight: bold;
  color: #ff9900;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.draggable-word.used-word {
  opacity: 0.5;
  cursor: default;
  background-color: #eee;
  border-color: #ccc;
  color: #aaa;
}

.draggable-word:not(.used-word):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.buttons-container {
  margin-top: 30px;
}

.submit-button, .back-button {
  padding: 12px 25px;
  font-size: 1.1em;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin: 0 10px;
}

.submit-button {
  border: none;
  background-color: #42b983;
  color: white;
}

.submit-button:hover {
  background-color: #369c73;
}

.back-button {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #555;
}

.back-button:hover {
  background-color: #eee;
  color: #333;
}
</style>