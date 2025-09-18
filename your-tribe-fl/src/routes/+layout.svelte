<script>
  import favicon from "/img/logo.png";
  import { Header } from "$lib";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header />

<main>
  {@render children?.()}
</main>