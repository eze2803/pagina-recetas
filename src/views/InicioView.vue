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

            <button v-if="authStore.user" class="btn btn-outline-danger mt-2" @click="agregarAFavoritos(item)">
              ❤️ Agregar a favoritos
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalReceta ref="modalRecetaRef" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import recetas from '@/services/recetasService';
import ModalReceta from '../components/ModalReceta.vue';
import { IReceta } from '../interfaces/IReceta';
import { agregarFavoritos } from '../firebase/favorites';
import { IFavoritos } from '@/interfaces/IFavoritos';

const authStore = useAuthStore();
const items = recetas.getRecetas();
const error = recetas.getError();
const modalRecetaRef = ref();

const getRecetas = async () => {
  try {
    await recetas.fetchRecetas();
  } catch (error) {
    console.log('Error fetching recetas:', error);
  }
};

const verReceta = async (receta: IReceta) => {
  await recetas.seleccionarReceta(receta);
  modalRecetaRef.value.abrirModal();
};

const agregarAFavoritos = async (receta: IReceta) => {
  if (!authStore.user) {
    alert('Debes iniciar sesión para agregar a favoritos');
    return;
  }

  const favorito: IFavoritos = {
    id: receta.id?.toString() || '',
    title: receta.title || '',
    image: receta.image || '',
    summary: receta.summary || '',
    userId: authStore.user.uid
  };

  try {
    await agregarFavoritos(authStore.user.uid, favorito);
    alert('Receta agregada a favoritos!');
  } catch (err) {
    alert('Hubo un error al guardar la receta');
    console.error(err);
  }
};

onMounted(() => {
  getRecetas();
});
</script>
