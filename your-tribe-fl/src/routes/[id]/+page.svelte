<script>
  export let data;
  let member, prevId, nextId, bioFromServer;
  $: ({ member, prevId, nextId, bio: bioFromServer } = data);

  const FALLBACK_BIO = `Lorem ipsum dolor sit amet consectetur. Vitae non id nulla neque eu suspendisse aliquet in. Interdum viverra facilisis ac risus scelerisque arcu. Feugiat et ullamcorper nisl orci enim venenatis nulla integer natoque.`;

  $: displayName = member?.name ?? "Onbekend lid";
  $: mugshotUrl = member?.mugshot ? `https://fdnd.directus.app/assets/${member.mugshot}` : null;
  $: bioText = bioFromServer || member?.bio || FALLBACK_BIO;

  const guard = (enabled) => (e) => {
    if (!enabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  import { goto } from "$app/navigation";

  function navWithVT(event, to) {
    event.preventDefault();
    if (document?.startViewTransition) {
      document.startViewTransition(() => goto(to));
    } else {
      goto(to);
    }
  }
</script>

<nav class="topnav" aria-label="Profiel navigatie">
  <a
    class="iconbtn"
    href={prevId ? "/" + prevId : "#"}
    tabindex={prevId ? 0 : -1}
    on:click={(e) => {
      if (prevId) navWithVT(e, "/" + prevId);
      else {
        e.preventDefault();
        e.stopPropagation();
      }
    }}>←</a
  >

  <a class="iconbtn" href="/" on:click={(e) => navWithVT(e, "/")}>✕</a>

  <a
    class="iconbtn"
    href={nextId ? "/" + nextId : "#"}
    tabindex={nextId ? 0 : -1}
    on:click={(e) => {
      if (nextId) navWithVT(e, "/" + nextId);
      else {
        e.preventDefault();
        e.stopPropagation();
      }
    }}>→</a
  >
</nav>

<main class="detail">
  <section class="card photo">
    {#if mugshotUrl}
      <figure class="mugshot">
        <img
          src={mugshotUrl}
          alt={`Mugshot van ${displayName}`}
          width="360"
          height="360"
          loading="eager"
          style={`view-transition-name: mugshot-${member.id}`}
        />
        <figcaption class="chip">{displayName}</figcaption>
      </figure>
    {:else}
      <div class="placeholder">
        <span class="chip">{displayName}</span>
        <p>Geen foto beschikbaar</p>
      </div>
    {/if}
  </section>

  <section class="card bio">
    <h2 class="visually-hidden">Bio</h2>
    <p>{bioText}</p>
  </section>
</main>
