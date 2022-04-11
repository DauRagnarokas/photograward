import {writable} from 'svelte/store'
export const photos = writable([])

const fetchPhotos = async () => {
    let isLoading = true;
    let searchResults = [];
    let totalPages = null;
    let searchTerm = 'people';
    let nextPage  = 1;
    const  UNSPLASH_ACCESS_KEY = 'Upx2oSk7gei--3Em7heduXc2ugldlaXJR3Auw630Ja8';
    const endpoint =  `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${nextPage}&per_page=28&client_id=${UNSPLASH_ACCESS_KEY}`;
    fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data.total === 0) {
        alert("No photos were found for your search query.")
        return;
      }

      searchResults = [...searchResults, ...data.results];
      photos.set(searchResults)
      totalPages = data.total_pages;

      if (nextPage < totalPages) {
        nextPage += 1;
      }
    })
    .catch(() => alert("An error occured!"))
.finally(() => {
    isLoading = false;

    // if (nextPage >= Number(totalPages)) {
    //   observer.unobserve(target);
    // }
  });
}

// fetchPhotos()