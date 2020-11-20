import { Video } from './video.interface';
import { getCategories } from './categories';
import { getAuthors } from './authors';
import { Category } from './category.interface';
import { Author } from './author.interface';


export const getVideos = (): Promise<Video[]> => {
  return Promise.all([getCategories(), getAuthors()])
    .then(([categories, authors]) => { 
    // TODO: implement here
    return getFormattedVideoData(categories, authors);
    
  });
};

/**
 * Maps the data from the API to the desired format Video[]
 * @param categories 
 * @param authors
 * @returns result Video[] 
 */
function getFormattedVideoData(categories: Category[], authors: Author[]): Video[] {
    let result: Video[] = [];

    // To decrease the count of loops later I have used Map interface here for categories
    const categoryMap = createCategoryMap(categories);

    for (const author of authors) {

      author.videos.forEach(video => {
        result.push(new Video(video.id, video.name, author.name, getCategoryNames(video.catIds, categoryMap)));
      })
    }
  
    return result;
}

/**
 * Utility function to convert array of categories to a HashMap 
 * @param categories
 * @returns hashMap Map<number, string>
 */
function createCategoryMap(categories: Category[]): Map<number, string> {
  let hashMap = new Map();
    
  for (const {id, name} of categories) {
    hashMap.set(id, name);
  }

  return hashMap;
}

/**
 * Utility function to get the category names from the given ids
 * @param catIds
 * @param categoryMap 
 */
function getCategoryNames(catIds: number[], categoryMap: any) {
  let categoryNames: string[] = [];
  
  for (const id of catIds) {
    if (categoryMap.has(id)) {
      categoryNames.push(categoryMap.get(id));
    }
  }
    return categoryNames;
}