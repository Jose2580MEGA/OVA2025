<template>
  <div class="activity-container">
    <h3>Une las Parejas</h3>
    <div class="matching-grid">
      <div class="left-column">
        <div
          v-for="(item, index) in leftOptions"
          :key="item.id"
          class="match-item draggable"
          :draggable="true"
          @dragstart="dragStart($event, item.id)"
        >
          {{ item.text }}
        </div>
      </div>
      <div class="right-column">
        <div
          v-for="(item, index) in rightOptions"
          :key="item.id"
          class="match-item drop-target"
          @drop="drop($event, item.id)"
          @dragover.prevent
          :class="{ 'matched': matchedPairs[item.id] }"
        >
          {{ matchedPairs[item.id] ? getLeftText(matchedPairs[item.id]) : 'Arrastra aquí' }}
        </div>
      </div>
    </div>
    <button @click="submitActivity">Terminar Actividad</button>
  </div>
</template>

<script>
export default {
  name: 'Matching',
  data() {
    return {
      pairs: [
        { id: 'a1', left: 'Hello', right: 'Hola' },
        { id: 'a2', left: 'Goodbye', right: 'Adiós' },
        { id: 'a3', left: 'Thank you', right: 'Gracias' },
        { id: 'a4', left: 'Please', right: 'Por favor' },
      ],
      leftOptions: [],
      rightOptions: [],
      matchedPairs: {}, // { right_id: left_id }
      draggedItemId: null,
    };
  },
  created() {
    this.loadPairs();
  },
  methods: {
    loadPairs() {
      // Shuffle both sides independently
      this.leftOptions = [...this.pairs].sort(() => 0.5 - Math.random());
      this.rightOptions = [...this.pairs].sort(() => 0.5 - Math.random()).map(p => ({ id: p.id, text: p.right }));
      this.matchedPairs = {};
    },
    dragStart(event, itemId) {
      this.draggedItemId = itemId;
      event.dataTransfer.setData('text/plain', itemId);
      event.dataTransfer.effectAllowed = 'move';
    },
    drop(event, targetRightId) {
      event.preventDefault();
      const draggedLeftId = event.dataTransfer.getData('text/plain');
      this.$set(this.matchedPairs, targetRightId, draggedLeftId);
      // Optional: Prevent dragging the same item twice if you want
      // For simplicity, we allow re-matching here.
    },
    getLeftText(id) {
      const item = this.leftOptions.find(opt => opt.id === id);
      return item ? item.text : '';
    },
    submitActivity() {
      let correctCount = 0;
      this.rightOptions.forEach(rightItem => {
        const leftIdMatched = this.matchedPairs[rightItem.id];
        if (leftIdMatched && leftIdMatched === rightItem.id) { // Check if the correct pair was made
          correctCount++;
        }
      });
      this.$emit('activity-completed', {
        activityName: 'Matching',
        totalQuestions: this.pairs.length,
        correctAnswers: correctCount,
      });
    },
  },
};
</script>

<style>
/* components/activities/Matching.vue */
.matching-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 250px;
}

.match-item {
  background-color: #e0f7fa; /* Azul claro */
  border: 1px solid #b2ebf2;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  cursor: grab;
  transition: background-color 0.3s ease;
}

.match-item.draggable {
  cursor: grab;
}

.match-item.drop-target {
  background-color: #fff3e0; /* Naranja claro */
  border: 1px solid #ffe0b2;
  min-height: 50px; /* Para que sea más fácil arrastrar a él */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
  cursor: default;
}

.match-item.drop-target.matched {
  background-color: #c8e6c9; /* Verde claro cuando está emparejado */
  color: #333;
}

.match-item:hover {
  background-color: #b2ebf2;
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