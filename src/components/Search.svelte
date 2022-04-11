<script>
    export let query;
    export let handleSubmit;
  </script>

  <style>
    .form-input {
      border-radius: 40px;
      font-size: 20px;
    }
  </style>

  <div class="search">
    <form class="search-form" on:submit|preventDefault={handleSubmit}>
      <div class="relative text-gray-600 focus-within:text-gray-400">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
        <input  bind:value={query} type="search" name="q" class="form-input w-full py-4 text-sm bg-gray-100  rounded-md pl-10 pr-4 outline-2 outline-blue focus:outline focus:bg-white focus:text-gray-900" placeholder="Search photos.." autocomplete="off">
</div>
    </form>
  </div>
  