<template>
  <div class="crossword-activity">
    <h3 class="activity-header">{{ activityData.title }}</h3>
    <p class="instruction-text">Completa las palabras del crucigrama usando las definiciones.</p>

    <div class="crossword-grid" :style="gridStyle">
      <div
        v-for="(cell, index) in gridCells"
        :key="index"
        class="grid-cell"
        :class="{ 'filled': cell.isFilled, 'active-clue': activeClueIndex === index }"
        @click="selectCell(index)"
      >
        <input
          v-if="cell.isFilled"
          type="text"
          maxlength="1"
          class="cell-input"
          v-model="userAnswers[index]"
          @input="handleInput(index, $event.target.value)"
        />
        <span v-else class="empty-cell"></span>
      </div>
    </div>

    <div class="clues-section">
      <h4>Definiciones:</h4>
      <ul>
        <li v-for="(clue, index) in activityData.definitions" :key="index" @click="highlightClue(index)">
          <strong>{{ clue.clue }}</strong>
        </li>
      </ul>
    </div>

    <div class="buttons-container">
      <button @click="checkAnswers" class="submit-button">Verificar Crucigrama</button>
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
        title: 'Crucigrama',
        definitions: [],
        gridSize: { rows: 5, cols: 5 }
      })
    }
  },
  data() {
    const gridCells = [];
    const userAnswers = [];
    const totalCells = this.activityData.gridSize.rows * this.activityData.gridSize.cols;
    for (let i = 0; i < totalCells; i++) {
      gridCells.push({ isFilled: false, correctLetter: '' });
      userAnswers.push('');
    }

    // Llenar celdas con palabras de ejemplo (esto sería más complejo para un crucigrama real)
    this.activityData.definitions.forEach(def => {
      const startIdx = def.row * this.activityData.gridSize.cols + def.col;
      for (let i = 0; i < def.answer.length; i++) {
        let cellIndex;
        if (def.orientation === 'across') {
          cellIndex = startIdx + i;
        } else { // 'down'
          cellIndex = startIdx + (i * this.activityData.gridSize.cols);
        }
        if (cellIndex < totalCells) {
          gridCells[cellIndex].isFilled = true;
          gridCells[cellIndex].correctLetter = def.answer[i].toUpperCase();
        }
      }
    });

    return {
      gridCells,
      userAnswers,
      activeClueIndex: null, // Para resaltar celdas relacionadas con la pista activa
    };
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.activityData.gridSize.cols}, 40px)`,
        gridTemplateRows: `repeat(${this.activityData.gridSize.rows}, 40px)`,
      };
    }
  },
  methods: {
    selectCell(index) {
      // Lógica para seleccionar una celda, si la hubiera
      // En un crucigrama real, esto activaría la pista relevante.
      this.activeClueIndex = index;
    },
    handleInput(index, value) {
      this.userAnswers[index] = value.toUpperCase();
      // Opcional: mover al siguiente input
    },
    highlightClue(clueIndex) {
      // Lógica para resaltar las celdas de la pista seleccionada.
      // Esto requeriría un mapeo de pistas a índices de celda.
      console.log('Pista seleccionada:', this.activityData.definitions[clueIndex].clue);
    },
    checkAnswers() {
      let correctCount = 0;
      let totalFilledCells = 0;

      this.gridCells.forEach((cell, index) => {
        if (cell.isFilled) {
          totalFilledCells++;
          if (this.userAnswers[index] === cell.correctLetter) {
            correctCount++;
          }
        }
      });

      const score = totalFilledCells > 0 ? (correctCount / totalFilledCells) * 100 : 0;
      alert(`Crucigrama completado. Tienes ${correctCount} de ${totalFilledCells} letras correctas. Puntaje: ${score.toFixed(2)}%`);

      this.$emit('activity-completed', {
        activityId: this.activityData.title,
        score: score.toFixed(2),
        details: { correctCount, totalFilledCells }
      });
    }
  },
};
</script>

<style scoped>
.crossword-activity {
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

.crossword-grid {
  display: grid;
  border: 2px solid #333;
  margin: 20px auto;
  background-color: #eee;
  width: fit-content;
}

.grid-cell {
  width: 40px;
  height: 40px;
  border: 1px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-sizing: border-box;
}

.grid-cell.empty-cell {
  background-color: #333; /* Celdas negras */
  border-color: #333;
}

.cell-input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-size: 1.2em;
  text-transform: uppercase;
  background: transparent;
  outline: none;
  padding: 0;
  margin: 0;
}

.cell-input:focus {
  background-color: #e0f2f7; /* Resaltar al enfocar */
}

.clues-section {
  text-align: left;
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.clues-section h4 {
  margin-top: 0;
  color: #34495e;
  font-size: 1.4em;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.clues-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.clues-section li {
  margin-bottom: 8px;
  font-size: 1em;
  color: #444;
  cursor: pointer;
}

.clues-section li:hover {
  color: #007bff;
  text-decoration: underline;
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