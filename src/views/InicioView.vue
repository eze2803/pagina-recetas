<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(item, index) in items" :key="index">
        <div class="card h-100">
          <img :src="item.image" class="card-img-top" :alt="item.title" />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <button class="btn btn-primary w-100" @click="verReceta(item)">Ver receta</button>
            <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para mostrar la receta -->
  <div class="modal fade" id="modalReceta" tabindex="-1" aria-labelledby="modalRecetaLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalRecetaLabel">{{ recetaSeleccionada?.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <!-- Condicional de carga -->
          <div v-if="ingredients.length === 0 && steps.length === 0" class="alert alert-info text-center">
            Cargando receta...
          </div>

          <!-- Mostrar Ingredientes -->
          <h6 v-if="ingredients.length > 0">Ingredientes:</h6>
          <ul v-if="ingredients.length > 0">
            <li v-for="(ing, i) in ingredients" :key="i">{{ ing.original }}</li>
          </ul>

          <!-- Mostrar Pasos -->
          <h6 v-if="steps.length > 0">Pasos:</h6>
          <ol v-if="steps.length > 0">
            <li v-for="(step, i) in steps" :key="i">{{ step.step }}</li>
          </ol>
        </div> <button v-if="usuarioLogueado" class="btn btn-warning mt-3" @click="agregarAFavoritos">
          Agregar a favoritos
        </button>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import RecetasService from '../services/RecetasService';
import { IReceta } from '../interfaces/IReceta';
import * as bootstrap from 'bootstrap';

const recetas = new RecetasService();
const items = recetas.getRecetas();
const error = recetas.getError();
const recetaSeleccionada = recetas.getRecetaSeleccionada();
const ingredients = recetas.getIngredients();
const steps = recetas.getSteps();
let modalReceta: bootstrap.Modal;

const getRecetas = async () => {
  try {
    await recetas.fetchRecetas();
  } catch (error) {
    console.log('Error fetching recetas:', error);
  }
};

const verReceta = (receta: IReceta) => {
  recetas.seleccionarReceta(receta);
  const modalElement = document.getElementById('modalReceta');
  if (modalElement) {
    modalReceta = new bootstrap.Modal(modalElement);
    modalReceta.show();
  }
};
const agregarAFavoritos = () => {
  if (recetaSeleccionada.value) {
    recetas.guardarEnFavoritos(recetaSeleccionada.value);
    alert('¡Receta guardada en favoritos!');
  }
}

onMounted(() => {
  getRecetas();
});
</script>

<style scoped>
.btn {
  margin-top: 10px;
}
</style>