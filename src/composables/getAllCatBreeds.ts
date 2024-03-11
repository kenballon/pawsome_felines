import { ref } from 'vue';
import instance, { handleApiError } from './errorHandler';

interface Breed {
  readonly id: string;
  readonly name: string;
  readonly reference_image_id: string;
}

export default function getAllCatBreeds() {
  const breeds = ref<Breed[]>([]);
  const error = ref<Error | null>(null);

  const fetchBreeds = async () => {
    try {
      const response = await instance.get('/breeds');
      breeds.value = response.data as Breed[];      
    } catch (err) {
      error.value = err as Error;
      handleApiError(error.value);
    }
  };

  return { breeds, error, fetchBreeds };
}