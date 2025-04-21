import { ref, Ref } from 'vue';
import { IReceta, Ingredients, IStep } from '@/interfaces/IReceta';

class RecetasService {
    private recetas: Ref<IReceta[]> = ref([]);
    private ingredients: Ref<Ingredients[]> = ref([]);
    private steps: Ref<IStep[]> = ref([]);
    private error: Ref<string | null> = ref(null);
    private recetaSeleccionada: Ref<IReceta | null> = ref(null);
    private loading: Ref<boolean> = ref(false);

    getRecetas(): Ref<IReceta[]> {
        return this.recetas;
    }

    getIngredients(): Ref<Ingredients[]> {
        return this.ingredients;
    }

    getSteps(): Ref<IStep[]> {
        return this.steps;
    }

    getError(): Ref<string | null> {
        return this.error;
    }

    getRecetaSeleccionada(): Ref<IReceta | null> {
        return this.recetaSeleccionada;
    }

    getLoading(): Ref<boolean> {
        return this.loading;
    }

    async seleccionarReceta(receta: IReceta) {
        try {
            this.loading.value = true;
            this.recetaSeleccionada.value = receta;

            let pasos = receta.analyzedInstructions?.[0]?.steps || [];
            let ingredientes = receta.extendedIngredients || [];


            if ((!pasos.length || !ingredientes.length) && receta.id) {
                const res = await fetch(`https://api.spoonacular.com/recipes/${receta.id}/information?apiKey=2d8012f6935b4b8884d4b26c3edaaefc`);
                const data = await res.json();
                pasos = data.analyzedInstructions?.[0]?.steps || [];
                ingredientes = data.extendedIngredients || [];
            }

            this.steps.value = pasos;
            this.ingredients.value = ingredientes;
            this.loading.value = false;
        } catch (error) {
            console.error('Error al seleccionar receta:', error);
            this.error.value = 'Error al seleccionar la receta';
            this.loading.value = false;
        }
    }
    async buscarPorQuery(query: string) {
        try {
            const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=2d8012f6935b4b8884d4b26c3edaaefc`);
            if (!res.ok) {
                this.error.value = 'Error al buscar las recetas';
                return;
            }

            const data = await res.json();
            this.recetas.value = data.results;
        } catch (error) {
            this.error.value = 'No se pudieron cargar las recetas';
            console.error(error);
        }
    }


    async fetchRecetas() {
        try {
            const res = await fetch(
                'https://api.spoonacular.com/recipes/random?number=12&apiKey=2d8012f6935b4b8884d4b26c3edaaefc'
            );

            if (!res.ok) {
                this.error.value = `Error HTTP: ${res.status}`;
                return;
            }

            const items = await res.json();
            this.recetas.value = items.recipes;
        } catch (error) {
            console.error('Error al obtener recetas:', error);
            this.error.value = 'No se pudieron cargar las recetas';
        }
    }

    guardarEnFavoritos(receta: IReceta) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        favoritos.push(receta);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    obtenerFavoritos(): IReceta[] {
        return JSON.parse(localStorage.getItem('favoritos') || '[]');
    }
}


export default RecetasService;