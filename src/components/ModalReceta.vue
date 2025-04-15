<template>
    <div class="modal fade" ref="modalRef" id="modalReceta" tabindex="-1" aria-labelledby="modalRecetaLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalRecetaLabel">{{ recetaSeleccionada?.title || 'Cargando...' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div v-if="loading" class="alert alert-info text-center">
                        Cargando receta...
                    </div>

                    <h6 v-if="ingredients.length > 0">Ingredientes:</h6>
                    <ul v-if="ingredients.length > 0">
                        <li v-for="(ing, i) in ingredients" :key="i">{{ ing.original }}</li>
                    </ul>

                    <h6 v-if="steps.length > 0">Pasos:</h6>
                    <ol v-if="steps.length > 0">
                        <li v-for="(step, i) in steps" :key="i">{{ step.step }}</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue';
import * as bootstrap from 'bootstrap';
import RecetasService from '@/services/RecetasServiceClass';


const recetas = new RecetasService();
const recetaSeleccionada = recetas.getRecetaSeleccionada();
const ingredients = recetas.getIngredients();
const steps = recetas.getSteps();
const loading = recetas.getLoading();

const modalRef = ref<HTMLElement | null>(null);
let modalReceta: bootstrap.Modal;


onMounted(() => {
    if (modalRef.value) {
        modalReceta = new bootstrap.Modal(modalRef.value);
    } else {
        console.error('Modal element no encontrado');
    }
});

const abrirModal = () => {
    if (modalReceta) {
        modalReceta.show();
    }
};

defineExpose({ abrirModal });
</script>

<style scoped>
.modal-body {
    max-height: 60vh;
    overflow-y: auto;
}
</style>