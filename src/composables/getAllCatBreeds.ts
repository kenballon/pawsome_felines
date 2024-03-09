import { ref } from 'vue'
import instance, { handleApiError } from './errorHandler';

interface Breed {
  id: string;
  name: string;
  image_ref_id: string;
  
}

export default function useCatBreeds() {
  const breeds = ref<Breed[]>([])
  const error = ref<Error | null>(null)

  const fetchBreeds = async () => {
    try {
      const response = await instance.get('/breeds')   
      // console.log(response.data);
      if (Array.isArray(response.data)) {
        breeds.value = response.data.map(breed => ({
          id: breed.id,
          name: breed.name,
          image_ref_id: breed.reference_image_id
        }))
      } else {
        throw new Error('Invalid response data')
      }
    } catch (err) {
      error.value = err as Error
      handleApiError(err)
    }
  }

  return { breeds, error, fetchBreeds }
}