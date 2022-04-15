<script>
    import Icon from '@iconify/svelte';
    export let iconName;
    export let title;
</script>
<button class="w-12 h-12 rounded-full flex justify-center items-center bg-neutral-200 hover:bg-white" title={title}>
    <Icon icon={iconName} height="28" color="black" />
  </button>