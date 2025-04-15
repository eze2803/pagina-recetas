<template>
    <div class="container">
        <div v-if="authStore.user">
            <h2>Favoritos</h2>
            <div class="row">
                <div class="col-md-4 mb-4" v-for="(item) in favoritos" :key="item.id">
                    <div class="card h-100">
                        <img :src="item.image" class="card-img-top" :alt="item.title" />
                        <div class="card-body">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <button class="btn btn-primary w-100" @click="verReceta(item)">Ver receta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Debes iniciar sesión para ver tus favoritos.</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { getFavorites } from '@/firebase/favorites';
import { IFavoritos } from '@/interfaces/IFavoritos';

const authStore = useAuthStore();
const favorites = ref<IFavoritos[]>([]);

const cargarFavorites = async () => {
    if (!authStore.user) return;
    try {
        favorites.value = await getFavorites(authStore.user.uid);
    } catch (error) {
        console.error('Error al cargar favoritos:', error);
    }
}

onMounted(() => {
    cargarFavorites();
});
</script>