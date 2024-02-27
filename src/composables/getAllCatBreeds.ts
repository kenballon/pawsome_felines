// src/composables/getAllCatBreeds.ts
import { ref } from 'vue'
import { getAllFeline } from '../catfetchconfig/config'

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;  
  }
}

export default function useCatBreeds() {
  const breeds = ref<Breed[]>([])
  const error = ref<Error | null>(null)

  const fetchBreeds = async () => {
    try {
      const response = await getAllFeline.get('/breeds')
      breeds.value = response.data
    } catch (err) {
      error.value = err as Error
    }
  }

  return { breeds, error, fetchBreeds }
}