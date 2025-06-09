<template>
  <div class="activity-container">
    <h3>Crucigrama</h3>
    <div class="crossword-grid">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="crossword-row">
        <input
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          :class="{ 'fillable': cell.fillable, 'non-fillable': !cell.fillable }"
          :disabled="!cell.fillable"
          :maxlength="1"
          v-model="cell.value"
          @input="handleInput(rowIndex, colIndex)"
          type="text"
        />
      </div>
    </div>
    <div class="clues-section">
      <h4>Pistas:</h4>
      <ul>
        <li v-for="(clue, index) in clues" :key="index">{{ clue }}</li>
      </ul>
    </div>
    <button @click="submitActivity">Terminar Actividad</button>
  </div>
</template>

<script>
export default {
  name: 'Crossword',
  data() {
    return {
      // 0 = no fillable, 1 = fillable
      // Example grid for "HELLO" and "WORLD" intersecting
      // H - - - -
      // E - - - -
      // L O - - -
      // L   R - -
      // O   L - -
      //     D - -
      solutionGrid: [
        ['', '', '', '', 'D', '', '', '', ''],
        ['E', '', 'D', '', 'E', '', '', '', ''],
        ['T', '', 'E', '', 'N', 'A', 'M', 'E', 'D'],
        ['O', '', 'K', '', 'R', '', '', '', ''],
        ['R', '', 'I', '', 'A', '', '', '', ''],
        ['W', 'A', 'L', 'K', 'E', 'D', '', '', ''],
        ['', 'T', '', 'E', '', '', '', '', ''],
        ['', 'E', '', 'P', '', '', '', '', '', ''],
        ['', '', '', 'T', 'O', 'L', 'D', '', ''],
      ],
      grid: [],
      clues: [
        'The next are Horizontal',
        'Past Tense of Walk',
        'Past Tense of Name (Nombrar)',
        'Past Tense of Keep',
        'The next are Vertical',
        'Past Tense of Eat',
        'Past Tense of Earn',
        'Past Tense of Keep',
        'Past Tense of Write',
        'Past Tense of Like',
      ],
    };
  },
  created() {
    this.initializeGrid();
  },
  methods: {
    initializeGrid() {
      this.grid = this.solutionGrid.map(row =>
        row.map(char => ({
          value: '',
          fillable: char !== '',
          correctValue: char,
        }))
      );
    },
    handleInput(rowIndex, colIndex) {
      // Optional: Logic to move cursor to next cell, check character type, etc.
      if (this.grid[rowIndex][colIndex].value) {
        this.grid[rowIndex][colIndex].value = this.grid[rowIndex][colIndex].value.toUpperCase();
      }
    },
    submitActivity() {
      let correctCount = 0;
      let totalFillable = 0;
      this.grid.forEach(row => {
        row.forEach(cell => {
          if (cell.fillable) {
            totalFillable++;
            if (cell.value.toUpperCase() === cell.correctValue.toUpperCase()) {
              correctCount++;
            }
          }
        });
      });
      this.$emit('activity-completed', {
        activityName: 'Crossword',
        totalQuestions: totalFillable, // Counting each letter as a 'question'
        correctAnswers: correctCount,
      });
    },
  },
};
</script>

<style>
/* components/activities/Crossword.vue */
.crossword-grid {
  display: inline-block; /* Para centrar la cuadrícula */
  border: 1px solid #ccc;
  margin-bottom: 30px;
}

.crossword-row {
  display: flex;
}

.crossword-grid input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.2em;
  border: 1px solid #eee;
  box-sizing: border-box;
  text-transform: uppercase;
  font-family: 'Eras ITC', sans-serif;
}

.crossword-grid input.fillable {
  background-color: white; /* Color para espacios rellenables */
  color: #333;
}

.crossword-grid input.non-fillable {
  background-color: #a9a9a9; /* Gris oscuro para espacios no rellenables */
  border-color: #888;
  cursor: not-allowed;
}

.crossword-grid input:focus {
  outline: 2px solid rgb(0, 145, 255); /* Azul para enfoque */
}

.clues-section {
  text-align: left;
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}

.clues-section h4 {
  margin-bottom: 15px;
  color: rgb(0, 145, 255); /* Azul */
}

.clues-section ul {
  list-style: decimal;
  padding-left: 25px;
}

.clues-section li {
  margin-bottom: 8px;
  font-size: 1.1em;
}

.activity-container button {
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: rgb(0, 145, 255); /* Azul */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.activity-container button:hover {
  background-color: rgb(0, 100, 200);
}
</style>