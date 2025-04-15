


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

            const pasos = receta.analyzedInstructions?.[0]?.steps || [];
            const ingredientes = receta.extendedIngredients || [];

            this.steps.value = pasos;
            this.ingredients.value = ingredientes;

            this.loading.value = false;
        } catch (error) {
            console.error('Error al seleccionar receta:', error);
            this.error.value = 'Error al seleccionar la receta';
            this.loading.value = false;
        }
    }

    async fetchRecetas() {
        try {
            this.loading.value = true;
            const res = await fetch(
                'https://api.spoonacular.com/recipes/random?number=12&apiKey=2d8012f6935b4b8884d4b26c3edaaefc'
            );

            if (!res.ok) {
                this.error.value = `Error HTTP: ${res.status}`;
                this.loading.value = false;
                return;
            }

            const data = await res.json();
            this.recetas.value = data.recipes;
        } catch (error) {
            console.error('Error al obtener recetas:', error);
            this.error.value = 'No se pudieron cargar las recetas';
        } finally {
            this.loading.value = false;
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



// import { ref, Ref } from 'vue';
// import { IReceta, Ingredients, IStep } from '@/interfaces/IReceta';

// class RecetasServices {
//     private recetas: Ref<IReceta[]> = ref([]);
//     private ingredients: Ref<Ingredients[]> = ref([]);
//     private step: Ref<IStep[]> = ref([]);
//     private error: Ref<string | null> = ref(null);
//     private recetaSeleccionada: Ref<IReceta | null> = ref(null);
//     private loading: Ref<boolean> = ref(true);

//     constructor() {
//         this.recetas = ref([]);
//         this.ingredients = ref([]);
//         this.step = ref([]);
//         this.recetaSeleccionada = ref(null);
//         this.error = ref(null);
//     }
//     getLoading(): Ref<boolean> {
//         return this.loading;
//     }

//     getRecetas(): Ref<IReceta[]> {
//         return this.recetas;
//     }

//     getIngredients(): Ref<Ingredients[]> {
//         return this.ingredients;
//     }

//     getSteps(): Ref<IStep[]> {
//         return this.step;
//     }

//     getError(): Ref<string | null> {
//         return this.error;
//     }

//     getRecetaSeleccionada(): Ref<IReceta | null> {
//         return this.recetaSeleccionada;
//     }
//     obtenerFavoritos(): IReceta[] {
//         return JSON.parse(localStorage.getItem('favoritos') || '[]');
//     }

//     async seleccionarReceta(receta: IReceta) {
//         try {
//             this.loading.value = true;
//             this.recetaSeleccionada.value = receta;

//             const pasos = receta.analyzedInstructions?.[0]?.steps || [];
//             const ingredientes = receta.extendedIngredients || [];

//             this.step.value = pasos;
//             this.ingredients.value = ingredientes;

//             this.loading.value = false;
//         } catch (error) {
//             console.error('Error al cargar ingredientes o pasos:', error);
//         }
//     }
//     guardarEnFavoritos(receta: IReceta) {
//         const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
//         favoritos.push(receta);
//         localStorage.setItem('favoritos', JSON.stringify(favoritos));
//     }
//     async fetchRecetas() {
//         try {
//             const res = await fetch('https://api.spoonacular.com/recipes/random?number=12&apiKey=2d8012f6935b4b8884d4b26c3edaaefc', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//             });

//             if (!res.ok) {
//                 this.error.value = `Error HTTP: ${res.status}`;
//                 return;
//             }

//             const items = await res.json();
//             console.log('Recetas obtenidas:', items);
//             this.recetas.value = items.recipes;
//         } catch (error) {
//             console.log(error);
//             this.error.value = 'Error fetching recetas';
//         }
//     }
// }

// export default RecetasServices