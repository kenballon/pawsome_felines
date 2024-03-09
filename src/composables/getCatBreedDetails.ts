import { ref } from "vue";
import instance, { handleApiError } from './errorHandler';

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
      const response = await instance.get(`/images/${breedId}`);
      
      if (response.data && Array.isArray(response.data.breeds)) {
        const item = response.data;
        const filteredData: CatOneImage = {
          id: item.id,
          url: item.url,
          breeds: Array.isArray(item.breeds) ? item.breeds.map((breed: any) => ({
            id: breed.id,
            name: breed.name,
            origin: breed.origin,
            description: breed.description,
            temperament: breed.temperament,
            wikipedia_url: breed.wikipedia_url,
          })) : [],
        };
        breedDetails.value.push(filteredData);
      } else {
        throw new Error('Invalid response data')
      }
    } catch (err) {
      error.value = err as Error;
      handleApiError(err);
    }
  };

  return { breedDetails, error, fetchBreedDetails };
}
