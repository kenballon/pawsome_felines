import { ref } from 'vue';
import instance, { handleApiError } from './errorHandler';

export interface CatBreedImage {
  readonly id: string;
  readonly url: string;
}

const error = ref<Error | null>(null);

export async function getRelatedCatBreedImages(breedId: string): Promise<CatBreedImage[] | undefined> {
  const params = {
    limit: 10,
    breed_ids: breedId,
  };

  try {
    const response = await instance.get<CatBreedImage[]>('/images/search', { params });

    if (Array.isArray(response.data)) {
      return response.data
        .filter(({ url }) => url && url.trim() !== '')
        .map(({ id, url }) => ({ id, url }));
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