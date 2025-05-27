<template>
  <div class="content-section">
    <h2 class="section-title">Contenidos</h2>
    <div class="content-wrapper">
      <h3 class="content-subtitle">Conceptos Básicos</h3>
      <p class="content-paragraph">Aquí puedes escribir la introducción y los conceptos fundamentales del tema.</p>
      <ul class="content-list">
        <li>Punto clave 1: ...</li>
        <li>Punto clave 2: ...</li>
        <li>Punto clave 3: ...</li>
      </ul>
      <h3 class="content-subtitle">Desarrollo del Tema</h3>
      <p class="content-paragraph">Aquí puedes explayarte en los diferentes aspectos del tema.</p>
      <p class="content-paragraph">Puedes usar subtítulos, imágenes, ejemplos, etc.</p>
    </div>
  </div>
</template>

<script>
export default {
  // Aquí puedes agregar lógica si necesitas cargar contenido dinámicamente
};
</script>

<style scoped>
.content-section {
  padding: 30px;
  background-color: rgb(191, 191, 191);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 900px;
}

.section-title {
  margin-bottom: 25px;
  text-align: center;
  font-size: 2.2em;
}

.content-wrapper {
  line-height: 1.6;
}

.content-subtitle {
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 1.6em;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.content-paragraph {
  margin-bottom: 15px;
  color: rgb(0, 0, 0);
  font-size: 1.05em;
}

.content-list {
  list-style-type: disc;
  margin-left: 25px;
  padding-left: 0;
  margin-bottom: 20px;
  color: rgb(56, 56, 56);
}

.content-list li {
  margin-bottom: 8px;
}
</style>