import { ref } from "vue";
import instance, { handleApiError } from "./errorHandler";

export default function getCatBreedDetails(breedId: string) {
  interface CatBreedDetails {
    readonly id: string;
    readonly name: string;
    readonly origin: string;
    readonly description: string;
    readonly temperament: string;
    readonly wikipedia_url: string;
  }
  interface CatOneImage {
    readonly id: string;
    readonly url: string;
    readonly breeds: CatBreedDetails[];
  }

  const breedDetails = ref<CatOneImage[]>([]);
  const error = ref<Error | null>(null);

  const fetchBreedDetails = async () => {
    try {
      const response = await instance.get(`/images/${breedId}`);

      const filteredData: CatOneImage = {
        id: response.data?.id,
        url: response.data?.url,
        breeds:
          response.data?.breeds?.map((breed: any) => ({
            id: breed?.id,
            name: breed?.name,
            origin: breed?.origin,
            description: breed?.description,
            temperament: breed?.temperament,
            wikipedia_url: breed?.wikipedia_url,
          })) ?? [],
      };

      breedDetails.value.push(filteredData);
    } catch (err) {
      error.value = err as Error;
      handleApiError(error.value);
    }
  };

  return { breedDetails, error, fetchBreedDetails };
}
