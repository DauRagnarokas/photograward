<script context="module">
     import { onMount } from 'svelte';
   // import {photoStore} from '../../stores/photo'
 const UNSPLASH_ACCESS_KEY =
  'Upx2oSk7gei--3Em7heduXc2ugldlaXJR3Auw630Ja8';
  let id;
  let photo;
let isLoading = false;
onMount(() => {
searchUnsplash();

  });
function searchUnsplash() {
    isLoading = true;
  const endpoint =
    `https://api.unsplash.com/photos/?${id}&client_id=${UNSPLASH_ACCESS_KEY}`;

    fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('data')
      console.log(data)
      if (data.total === 0) {
        alert("No photos were found for your search query.")
        return;
      }
photo = data;
    })
    .catch(() => alert("An error occured!"))
.finally(() => {
    isLoading = false;

  });
    }
export  async function load ({ params, fetch }) {
        id = params.id;
console.log(id);
await searchUnsplash()

return true;
      //  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      //  const post = await res.json();
      //  return {
      //      props: {
      //          post,
      //      }
      //  }
   }
  
</script>

<h1>Photo</h1>
<img class="photo rounded-3xl" src={photo.urls.small} alt={photo.description || ""}>
