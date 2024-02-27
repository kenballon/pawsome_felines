import { ref } from "vue";
import { getAllFeline } from "../catfetchconfig/config";

interface Breed {
  id: string;
  name: string;
  origin: string;
  description: string;
  temperament: string;
  life_span: string;
  image: {
    url: string;  
  }
}

export default function useCatBreedItem() {
  const breed = ref<Breed | null>(null);
  const error = ref<Error | null>(null);

  const fetchBreed = async (id: string) => {
    try {
      const response = await getAllFeline.get(`/breeds/${id}`);
      breed.value = response.data;
    } catch (err) {
      error.value = err as Error;
    }
  };

  return { breed, error, fetchBreed };
}
