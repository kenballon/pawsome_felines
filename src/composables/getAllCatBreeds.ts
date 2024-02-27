import { ref } from 'vue'
import axios from 'axios'

interface Breed {
  id: string;
  name: string;
}

export default function useCatBreeds() {
  const breeds = ref<Breed[]>([])
  const error = ref<Error | null>(null)

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY
        }
      })
      breeds.value = response.data
    } catch (err) {
      error.value = err as Error
    }
  }

  return { breeds, error, fetchBreeds }
}