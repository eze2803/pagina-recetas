
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { IFavoritos } from '@/interfaces/IFavoritos';

export const agregarFavoritos = async (userId: string, favorito: IFavoritos) => {
    try {
        const userFavoritesRef = collection(db, 'users', userId, 'favorites');
        await addDoc(userFavoritesRef, favorito);
    } catch (error) {
        console.error('Error al guardar en favoritos:', error);
        throw error;
    }
};
export const getFavorites = async (userId: string): Promise<IFavoritos[]> => {
    try {
        const userFavoritesRef = collection(db, 'users', userId, 'favorites');
        const q = query(userFavoritesRef);
        const querySnapshot = await getDocs(q);

        const favoritos: IFavoritos[] = [];
        querySnapshot.forEach((doc) => {
            favoritos.push({ id: doc.id, ...doc.data() } as IFavoritos);
        });

        return favoritos;
    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        throw error;
    }
};