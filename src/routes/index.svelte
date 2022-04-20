<svelte:head>
	<title>Photograward</title>
</svelte:head>
<script>
	import { onMount } from 'svelte';
	import Search from '../components/Search.svelte';
	import SearchResults from '../components/SearchResults.svelte';
	import LoadingIndicator from '../components/LoadingIndicator.svelte';
	import UserButton from '../components/UserButton.svelte';
	import NotificationButton from '../components/NotificationButton.svelte';
	import Logo from '../components/Logo.svelte';
	import { photos } from '../stores/photostore';
	import FAB from '../components/FAB.svelte';

	const UNSPLASH_ACCESS_KEY =
		'Upx2oSk7gei--3Em7heduXc2ugldlaXJR3Auw630Ja8';

	let searchQuery = '';
	let defaultSearchTerm = 'New York';
	let searchTerm = defaultSearchTerm;
	let totalPages = null;
	let searchResults = [];
	let nextPage = 1;
	let isLoading = false;
	// let searchTerm=''
	let observer;
	let target;

	const options = {
		rootMargin: '0px 0px 300px',
		threshold: 0
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
		observer = new IntersectionObserver(loadMoreResults, options);
		target = document.querySelector('.loading-indicator');
		observer.observe(target);
		searchUnsplash();

	});

	function handleSubmit() {
		searchQuery = searchQuery.trim();
		searchTerm = searchQuery.length > 0 ? searchQuery : defaultSearchTerm;
		searchResults = [];
		totalPages = null;
		nextPage = 1;

//   if (!searchTerm) return;
		observer.observe(target);

		searchUnsplash();
	}

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
					alert('No photos were found for your search query.');
					return;
				}

				searchResults = [...searchResults, ...data.results];
				photos.set(searchResults);
				totalPages = data.total_pages;

				if (nextPage < totalPages) {
					nextPage += 1;
				}
			})
			.catch(() => alert('An error occured!'))
			.finally(() => {
				isLoading = false;

				if (nextPage >= Number(totalPages)) {
					observer.unobserve(target);
				}
			});
	}
</script>

<style>
    #logo {
    }

    .Index {
        width: 100%;
        padding: 20px;
        margin: 0 auto 50px;
        text-align: center;
    }

    h1 {
        font-size: 50px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
</style>

<main class='Index'>
	<h1 class='hidden'>PhotogrAward</h1>
	<div class='flex p-4 items-center  sm:space-x-4 space-y-4 sm:space-y-0 sm:flex-row flex-col'>
<div class='ded' id='logo'>

<Logo />
</div>
		<div class='flex space-x-4 items-center grow w-full'><span class='grow'>

<Search bind:query={searchQuery} handleSubmit={handleSubmit} />

</span>
			<span class='flex-none' title='Notifications'><NotificationButton /></span>
			<span class='flex-none' title='Account'><UserButton /></span></div>
	</div>
	<SearchResults />
	<div class='loading-indicator'>
		{#if isLoading}
			<LoadingIndicator />
		{/if}
	</div>
	<div class='actions-bottom fixed  bottom-0 right-0 mr-8 mb-8 p-0 flex flex-col space-y-3'>

		<FAB iconName='charm:plus' title='Upload Photo' />
		<a href='/about'>
			<FAB iconName='ic:round-question-mark' title='About' />
		</a>
	</div>
</main>
