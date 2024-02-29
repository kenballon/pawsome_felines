import { ref } from "vue";
import { getAllFeline } from "../catfetchconfig/config";

export default function useCatBreedDetails(breedId: string) {
  interface CatBreedDetails {
    id: string;
    name: string;
    origin: string;
    description: string;
    temperament: string;
    wikipedia_url: string;
  }
  interface CatOneImage {
    id: string;
    url: string;
    breeds: CatBreedDetails[];
  }

  const breedDetails = ref<CatOneImage[]>([]);
  const error = ref<Error | null>(null);

  const fetchBreedDetails = async () => {
    try {
      const response = await getAllFeline.get(`/images/${breedId}`);
      const item = response.data;
      const filteredData: CatOneImage = {
        id: item.id,
        url: item.url,
        breeds: item.breeds.map((breed: any) => ({
          id: breed.id,
          name: breed.name,
          origin: breed.origin,
          description: breed.description,
          temperament: breed.temperament,
          wikipedia_url: breed.wikipedia_url,
        })),
      };
      breedDetails.value.push(filteredData);
    } catch (err) {
      error.value = err as Error;
    }
  };

  return { breedDetails, error, fetchBreedDetails };
}
