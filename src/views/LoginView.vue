<template>
    <div class="container mt-5">
        <div v-if="!authStore.user" class="row justify-content-center">
            <div class="col-md-6 col-lg-4">
                <div class="card shadow rounded-4">
                    <div class="card-body">
                        <h2 class="card-title text-center mb-4">
                            {{ isRegistering ? 'Registro' : 'Iniciar sesión' }}
                        </h2>

                        <form @submit.prevent="isRegistering ? handleRegister() : handleLogin()">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" id="email" v-model="email" class="form-control" required />
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" id="password" v-model="password" class="form-control" required />
                            </div>

                            <button type="submit" class="btn btn-primary w-100">
                                {{ isRegistering ? 'Registrarse' : 'Iniciar sesión' }}
                            </button>

                            <div v-if="authStore.error" class="alert alert-danger mt-3">
                                {{ authStore.error }}
                            </div>
                        </form>

                        <p class="mt-3 text-center">
                            {{ isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }}
                            <button class="btn btn-link p-0" @click="isRegistering = !isRegistering">
                                {{ isRegistering ? 'Inicia sesión aquí' : 'Regístrate aquí' }}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center">
            <h2 class="mb-3">Bienvenido, {{ authStore.user.email }}</h2>
            <button class="btn btn-danger" @click="handleLogout">
                Cerrar sesión
            </button>
            <FavoritosView />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import FavoritosView from '../views/FavoritosView.vue';
import { useRouter } from 'vue-router';

const isRegistering = ref(false);
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
    await authStore.loginUser(email.value, password.value);
    router.push({ name: 'favoritos' });
};

const handleRegister = async () => {
    await authStore.registerUser(email.value, password.value);
};

const handleLogout = async () => {
    await authStore.logoutUser();
};
</script>