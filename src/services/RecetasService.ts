import { ref, Ref } from 'vue';
import { IReceta, Ingredients, IStep } from '@/interfaces/IReceta';

class RecetasServices {
    private recetas: Ref<IReceta[]> = ref([]);
    private ingredients: Ref<Ingredients[]> = ref([]);
    private step: Ref<IStep[]> = ref([]);
    private error: Ref<string | null> = ref(null);
    private recetaSeleccionada: Ref<IReceta | null> = ref(null);

    constructor() {
        this.recetas = ref([]);
        this.ingredients = ref([]);
        this.step = ref([]);
        this.recetaSeleccionada = ref(null);
        this.error = ref(null);
    }

    getRecetas(): Ref<IReceta[]> {
        return this.recetas;
    }

    getIngredients(): Ref<Ingredients[]> {
        return this.ingredients;
    }

    getSteps(): Ref<IStep[]> {
        return this.step;
    }

    getError(): Ref<string | null> {
        return this.error;
    }

    getRecetaSeleccionada(): Ref<IReceta | null> {
        return this.recetaSeleccionada;
    }
    obtenerFavoritos(): IReceta[] {
        return JSON.parse(localStorage.getItem('favoritos') || '[]');
    }

    seleccionarReceta(receta: IReceta) {
        this.recetaSeleccionada.value = receta;

        // Verificar que extendedIngredients no sea undefined antes de mapear
        if (receta.extendedIngredients && Array.isArray(receta.extendedIngredients)) {
            console.log("Ingredientes:", receta.extendedIngredients);  // Log para verificar datos
            this.ingredients.value = receta.extendedIngredients.map((i) => ({
                original: i.original,
            }));
        } else {
            this.ingredients.value = [];
        }
        // Verificar que analyzedInstructions y pasos no sean undefined antes de mapear
        if (receta.analyzedInstructions && receta.analyzedInstructions.length > 0) {
            console.log("Pasos:", receta.analyzedInstructions);  // Log para verificar pasos
            const pasos = receta.analyzedInstructions[0].steps;
            if (pasos && pasos.length > 0) {
                this.step.value = pasos.map((p) => ({
                    number: p.number, // El número del paso
                    step: p.step, // El texto del paso

                }));
            } else {
                this.step.value = [];
            }
        }
    }
    guardarEnFavoritos(receta: IReceta) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        favoritos.push(receta);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
    async fetchRecetas() {
        try {
            const res = await fetch('https://api.spoonacular.com/recipes/random?number=12&apiKey=2d8012f6935b4b8884d4b26c3edaaefc', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!res.ok) {
                this.error.value = `Error HTTP: ${res.status}`;
                return;
            }

            const items = await res.json();
            console.log('Recetas obtenidas:', items);
            this.recetas.value = items.recipes;
        } catch (error) {
            console.log(error);
            this.error.value = 'Error fetching recetas';
        }
    }
}

export default RecetasServices