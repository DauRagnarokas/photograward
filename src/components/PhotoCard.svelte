

<script>
// import {writable} from 'svelte/store'
//  import {photoStore} from '../stores/photo'
import Icon from '@iconify/svelte';
import PhotoButton from './PhotoButton.svelte';
   export let photo;
    // export const photoStore = writable()
  </script>

  <style>
    .photo-card {
      animation: show 0.5s forwards ease-in-out;
    }

    .photo-card:hover .overlay2 {
      visibility: visible;
    }

    .photo {
      width: 100%;
      object-fit: cover;
      height: 300px;
      background-color: #ccc;
    }


    .photographer {
      display: inline-block;
    }

    .photographer a {
      color: #333;
      text-decoration: none;
    }

    .photographer a:hover {
      text-decoration: underline;
    }


    @keyframes show {
      0% {
        opacity: 0;
        transform: translateY(100px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>

  <li class="photo-card">
    <!-- <a href={photo.links.html} rel="noopener noreferrer" target="_blank"> -->
    <!-- <a href=/photos/{photo.id}  > -->
      <div class="wrap relative  rounded-3xl overflow-hidden mb-2"><div class="invisible overlay2 w-full h-full absolute bg-black bg-opacity-40">
        <div class="actions absolute bottom-0 left-0 right-0 flex space-x-3 justify-between p-3 pl-4">
          <PhotoButton iconName="entypo:select-arrows" title="Arrange" />

            <PhotoButton height='32' iconName='ph:hands-clapping-fill' title='Applause' />
          <PhotoButton iconName="fa-solid:money-bill-wave" title="Award" />
      </div>
      </div><img class="photo " src={photo.urls.small} alt={photo.description || ""}></div>
      <!-- <img class="photo rounded-3xl" src={photo.urls.small} alt={photo.description || ""}> -->
    <!-- </a> -->
    <span class="photographer font-bold">
      <!-- <a href={photo.user.links.html} rel="noopener noreferrer"         target="_blank"> -->
        {photo.user.name}
      <!-- </a> -->
    </span>
  </li>
  