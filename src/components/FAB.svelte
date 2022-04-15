<script>
      import Icon from '@iconify/svelte';

  export let iconName;
  export let title;
</script>
<button title={title}
                class="w-14 h-14 bg-white hover:bg-slate-100 rounded-full border-4 border-white drop-shadow-xl font-bold text-4xl active:shadow-lg mouse shadow transition ease-in duration-200 flex  justify-center items-center focus:outline-none">
                <Icon icon={iconName} height="32" color="black" />
              </button>