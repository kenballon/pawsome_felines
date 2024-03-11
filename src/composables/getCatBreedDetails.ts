import { ref } from "vue";
import instance from "./errorHandler";

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

const transformData = (data: CatOneImage): CatOneImage => ({
  id: data?.id,
  url: data?.url,
  breeds:
    data?.breeds?.map((breed: any) => ({
      id: breed?.id,
      name: breed?.name,
      origin: breed?.origin,
      description: breed?.description,
      temperament: breed?.temperament,
      wikipedia_url: breed?.wikipedia_url,
    })) ?? [],
});

export default function getCatBreedDetails(breedId: string) {
  const breedDetails = ref<CatOneImage[]>([]);
  const error = ref<Error | null>(null);

  const fetchBreedDetails = async () => {
    try {
      const response = await instance.get(`/images/${breedId}`);
      const filteredData = transformData(response.data);
      breedDetails.value.push(filteredData);
    } catch (err) {
      error.value = err as Error;
      console.error(error.value);
    }
  };

  return { breedDetails, error, fetchBreedDetails };
}