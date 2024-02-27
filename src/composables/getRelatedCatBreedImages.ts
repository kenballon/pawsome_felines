import { getAllFeline } from "../catfetchconfig/config";

export interface CatBreedImage {
  id: string;
  url: string;
  breeds: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

export async function getRelatedCatBreedImages(breedId: string) {
  const response = await getAllFeline.get<CatBreedImage[]>(
    `/images/search?limit=50&breed_ids=${breedId}`
  );
  return response.data;
}
