<template>
  <div class="matching-activity">
    <h3 class="activity-header">{{ activityData.title }}</h3>
    <p class="instruction-text">Arrastra los elementos de la izquierda y suéltalos en sus definiciones correctas de la derecha.</p>

    <div class="matching-container">
      <div class="left-column">
        <h4>Términos</h4>
        <div
          v-for="(item, index) in shuffledLeftItems"
          :key="item.id"
          class="draggable-item"
          draggable="true"
          @dragstart="startDrag(item.id, index)"
          :class="{ 'matched': matchedLeftItems.includes(item.id) }"
        >
          {{ item.text }}
        </div>
      </div>

      <div class="right-column">
        <h4>Definiciones</h4>
        <div
          v-for="(item, index) in shuffledRightItems"
          :key="item.id"
          class="droppable-zone"
          @dragover.prevent
          @drop="onDrop(item.id)"
          :class="{ 'dropped': droppedRightItems[item.id] !== undefined }"
        >
          <span v-if="droppedRightItems[item.id]">
            {{ getDroppedItemText(droppedRightItems[item.id]) }}
          </span>
          <span v-else>{{ item.text }}</span>
        </div>
      </div>
    </div>

    <div class="buttons-container">
      <button @click="checkAnswers" class="submit-button">Verificar Coincidencias</button>
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
        title: 'Emparejamiento',
        pairs: []
      })
    }
  },
  data() {
    const leftItems = this.activityData.pairs.map((pair, index) => ({ id: `left-${index}`, text: pair.left, correctPairId: `right-${index}` }));
    const rightItems = this.activityData.pairs.map((pair, index) => ({ id: `right-${index}`, text: pair.right, correctPairId: `left-${index}` }));

    return {
      shuffledLeftItems: this.shuffleArray([...leftItems]),
      shuffledRightItems: this.shuffleArray([...rightItems]),
      draggingItemId: null,
      draggingItemIndex: null,
      droppedRightItems: {}, // { rightItemId: leftItemId }
      matchedLeftItems: [], // Para ocultar los items arrastrados de la izquierda
    };
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    startDrag(itemId, index) {
      this.draggingItemId = itemId;
      this.draggingItemIndex = index;
    },
    onDrop(droppableZoneId) {
      if (this.draggingItemId) {
        // Asegurarse de que no se sobrescriba si ya hay un elemento
        if (this.droppedRightItems[droppableZoneId]) {
          // Si ya hay algo, regresarlo a la columna izquierda
          const oldLeftItemId = this.droppedRightItems[droppableZoneId];
          this.matchedLeftItems = this.matchedLeftItems.filter(id => id !== oldLeftItemId);
        }

        // Asignar el item arrastrado a la zona de soltar
        this.$set(this.droppedRightItems, droppableZoneId, this.draggingItemId);
        // Ocultar el item arrastrado de la columna izquierda
        this.matchedLeftItems.push(this.draggingItemId);

        this.draggingItemId = null;
        this.draggingItemIndex = null;
      }
    },
    getDroppedItemText(leftItemId) {
      const item = this.activityData.pairs.find((_, index) => `left-${index}` === leftItemId);
      return item ? item.left : '';
    },
    checkAnswers() {
      let correctMatches = 0;
      const totalPairs = this.activityData.pairs.length;

      this.activityData.pairs.forEach((pair, index) => {
        const leftId = `left-${index}`;
        const rightId = `right-${index}`;
        if (this.droppedRightItems[rightId] === leftId) {
          correctMatches++;
        }
      });

      const score = (correctMatches / totalPairs) * 100;
      alert(`Actividad de Emparejamiento completada. Tienes ${correctMatches} de ${totalPairs} coincidencias correctas. Puntaje: ${score.toFixed(2)}%`);

      this.$emit('activity-completed', {
        activityId: this.activityData.title,
        score: score.toFixed(2),
        details: { correctMatches, totalPairs }
      });
    },
  },
};
</script>

<style scoped>
.matching-activity {
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

.matching-container {
  display: flex;
  justify-content: space-around;
  gap: 30px;
  margin-top: 30px;
}

.left-column, .right-column {
  flex: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  min-height: 300px;
}

.left-column h4, .right-column h4 {
  margin-top: 0;
  color: #34495e;
  font-size: 1.4em;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.draggable-item {
  background-color: #e0f2f7;
  border: 1px solid #007bff;
  border-radius: 5px;
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: grab;
  text-align: center;
  font-weight: bold;
  color: #007bff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.draggable-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.draggable-item.matched {
  opacity: 0.5;
  cursor: default;
}

.droppable-zone {
  background-color: #f0f0f0;
  border: 2px dashed #aaa;
  border-radius: 5px;
  padding: 10px;
  min-height: 40px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-style: italic;
  font-size: 0.95em;
  transition: background-color 0.2s ease;
}

.droppable-zone.dropped {
  background-color: #d4edda;
  border: 2px solid #28a745;
  color: #28a745;
  font-style: normal;
  font-weight: bold;
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