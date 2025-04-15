import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, register, logout } from '@/firebase/auth'; // revisá el path según tu estructura
import { User } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const error = ref<string | null>(null);

    const loginUser = async (email: string, password: string) => {
        try {
            const userCredential = await login(email, password);
            user.value = userCredential.user;
            error.value = null;
        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = "Error al iniciar sesión: " + err.message;
            } else {
                error.value = "Error desconocido al iniciar sesión.";
            }
        }
    };

    const registerUser = async (email: string, password: string) => {
        try {
            const userCredential = await register(email, password);
            user.value = userCredential.user;
            error.value = null;
        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = "Error al registrar: " + err.message;
            } else {
                error.value = "Error desconocido al registrar.";
            }
        }
    };

    const logoutUser = async () => {
        try {
            await logout();
            user.value = null;
            error.value = null;
        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = "Error al cerrar sesión: " + err.message;
            } else {
                error.value = "Error desconocido al cerrar sesión.";
            }
        }
    };

    return {
        user,
        error,
        loginUser,
        registerUser,
        logoutUser,
    };
});