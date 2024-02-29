import { ref } from "vue";
import { getAllFeline } from "../catfetchconfig/config";


export default function useCatBreedDetails(breedId: string) {
  interface CatBreed {
    id: string;
    name: string;
    origin: string;
    temperament: string;
    description: string;
    reference_image_id: string;
    image: {
      url: string;
    }
  }
  const breedDetails = ref(null);
  // const breedDetails = ref<CatBreed []>([]);
  const error = ref<Error | null>(null);

  const fetchBreedDetails = async () => {
    try {
      const response = await getAllFeline.get(`/images/search?q=${breedId}`);
      breedDetails.value = response.data;
    } catch (err) {
      error.value = err as Error;
    }
  };

  return { breedDetails, error, fetchBreedDetails };
}
