<template>
  <nav class="navbar bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Inicio</router-link>
      <router-link to="/favoritos" class="navbar-brand">Favoritos</router-link>
      <form class="d-flex" role="search" @submit.prevent="buscarRecetas">
        <input class="form-control me-2" type="search" placeholder="Buscar receta..." v-model="searchQuery"
          aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
    </div>
  </nav>
  <router-view />
</template>

<script setup>
import { ref } from 'vue';
import recetas from '@/services/recetasService';

const searchQuery = ref('');

const buscarRecetas = async () => {
  if (searchQuery.value.trim()) {
    await recetas.buscarPorQuery(searchQuery.value);
  }
};
</script>

<style scoped></style>
