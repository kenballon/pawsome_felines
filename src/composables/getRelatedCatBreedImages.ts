import instance, { handleApiError } from './errorHandler';

export interface Breed {
  id: string;
  name: string;
  description: string;
  temperament: string;
}

export interface CatBreedImage {
  id: string;
  url: string;
  breeds: Breed[];
}

export async function getRelatedCatBreedImages(breedId: string): Promise<CatBreedImage[] | undefined> {
  try {
    const response = await instance.get<CatBreedImage[]>('/images/search', {
      params: {
        limit: 50,
        breed_ids: breedId
      }
    });
    
    if (Array.isArray(response.data)) {
      return response.data.map(image => ({
        id: image.id,
        url: image.url,
        breeds: image.breeds.map(breed => ({
          id: breed.id,
          name: breed.name,
          description: breed.description,
          temperament: breed.temperament,
        }))
      }));
    } else {
      throw new Error('Invalid response data');
    }

  } catch (error) {
    handleApiError(error);
  }
}