import {writable} from 'svelte/store'
import LoadingIndicator from '../components/LoadingIndicator.svelte';
import { onMount } from 'svelte';
export const photos = writable([])
const  UNSPLASH_ACCESS_KEY = 'Upx2oSk7gei--3Em7heduXc2ugldlaXJR3Auw630Ja8';
let searchQuery = '';
let searchTerm = null;
let totalPages = null;
let searchResults = [];
let nextPage = 1;
let isLoading = false;
let observer;
  let target;

  const options = {
    rootMargin: '0px 0px 300px',
    threshold: 0,
  };
  const loadMoreResults = entries => {
    entries.forEach(entry => {
      // If new search or if ongoing search
      if (nextPage === 1 || isLoading) return;

      // target is intersecting the viewport
      if (entry.isIntersecting) {
        searchUnsplash();
      }
    });
  };

  onMount(() => {
    console.log('on mount')
  observer = new IntersectionObserver(loadMoreResults, options);
  target = document.querySelector('.loading-indicator');

});

function searchUnsplash() {
    isLoading = true;

  const endpoint =
    `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${nextPage}&per_page=28&client_id=${UNSPLASH_ACCESS_KEY}`;

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
      photos.set(searchResults);
      totalPages = data.total_pages;

      if (nextPage < totalPages) {
        nextPage += 1;
      }
    })
    .catch(() => alert("An error occured!"))
.finally(() => {
    isLoading = false;

    if (nextPage >= Number(totalPages)) {
      observer.unobserve(target);
    }
  });
    }
    
const fetchPhotos = async () => {
    let isLoading = true;
    let searchResults = [];
    let totalPages = null;
    let searchTerm = 'people';
    let nextPage  = 1;
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

fetchPhotos()