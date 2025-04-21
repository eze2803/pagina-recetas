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
                    <h6 v-if="ingredients.length > 0">Ingredientes:</h6>
                    <ul v-if="ingredients.length > 0">
                        <li v-for="(ing, i) in ingredients" :key="i">{{ ing.original }}</li>
                    </ul>
                    <!-- Resumen de la receta -->
                    <div v-if="recetaSeleccionada?.summary" class="mt-3">
                        <h6>Resumen:</h6>
                        <div v-html="recetaSeleccionada.summary"></div>
                    </div>

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
import recetas from '@/services/recetasService';

const recetaSeleccionada = recetas.getRecetaSeleccionada();
const ingredients = recetas.getIngredients();
const steps = recetas.getSteps();

const modalRef = ref<HTMLElement | null>(null);
let modalReceta: bootstrap.Modal;

onMounted(() => {
    if (modalRef.value) {
        modalReceta = new bootstrap.Modal(modalRef.value);
    }
});

const abrirModal = () => {
    modalReceta?.show();
};

defineExpose({ abrirModal });
</script>