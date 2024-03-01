import { getAllFeline } from "../thecatapi/config";

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
    const response = await getAllFeline.get<CatBreedImage[]>('/images/search', {
      params: {
        limit: 100,
        breed_ids: breedId
      }
    });
    
    return response.data;

  } catch (error) {
    console.error(`Failed to get cat breed images: ${error}`);
  }
}
