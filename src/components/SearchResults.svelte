<script>
 import {photos} from '../stores/photostore'
   import PhotoCard from './PhotoCard.svelte';

  </script>

  <style>
    .search-results {
      list-style: none;
      display: grid;
      gap: 40px 20px;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  </style>

  <ul class="search-results pt-4">
    {#each $photos as result (result.id)}
      <PhotoCard photo={result} />
    {/each}
  </ul>
  