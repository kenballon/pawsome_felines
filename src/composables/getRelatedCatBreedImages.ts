import { ref } from 'vue';
import instance, { handleApiError } from './errorHandler';

export interface Breed {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly temperament: string;
}

export interface CatBreedImage {
  readonly id: string;
  readonly url: string;
  readonly breeds: ReadonlyArray<Breed>;
}

const error = ref<Error | null>(null);

function transformImage(image: any): CatBreedImage {
  const { id, url, breeds } = image;
  return {
    id,
    url,
    breeds: Array.isArray(breeds) ? breeds.map(({ id, name, description, temperament }: any) => ({
      id,
      name,
      description,
      temperament,
    })) : [],
  };
}

export async function getRelatedCatBreedImages(breedId: string): Promise<CatBreedImage[] | undefined> {
  const params = {
    limit: 10,
    breed_ids: breedId,
  };

  try {
    const response = await instance.get<CatBreedImage[]>('/images/search', { params });

    if (Array.isArray(response.data)) {
      return response.data.map(transformImage);
    } else {
      throw new Error('Invalid response data');
    }

  } catch (err) {
    if (err instanceof Error) {
      error.value = err;
      handleApiError(error.value);
    }
    return undefined;
  }
}