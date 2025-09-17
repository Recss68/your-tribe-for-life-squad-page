<script>
  export let data;
  let member, prevId, nextId, bio;
  $: ({ member, prevId, nextId, bio } = data);

  $: displayName = member?.name ?? "Onbekend lid";
  $: mugshotUrl = member?.mugshot ? `https://fdnd.directus.app/assets/${member.mugshot}` : null;
  $: bioText = bio;

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

<main class="detail">
  <section class="card bio">
    <h2 class="visually-hidden">Bio</h2>
    <p>{bioText}</p>
  </section>

  <nav class="topnav" aria-label="Profiel navigatie">
    <a
      class="iconbtn prev"
      href={prevId ? "/" + prevId : "#"}
      tabindex={prevId ? 0 : -1}
      on:click={(e) => {
        if (prevId) navWithVT(e, "/" + prevId);
        else {
          e.preventDefault();
          e.stopPropagation();
        }
      }}><span class="mob">←</span><span class="desk">↑</span></a
    >

    <a class="iconbtn close" href="/" on:click={(e) => navWithVT(e, "/")}> ✕ </a>

    <a
      class="iconbtn next"
      href={nextId ? "/" + nextId : "#"}
      tabindex={nextId ? 0 : -1}
      on:click={(e) => {
        if (nextId) navWithVT(e, "/" + nextId);
        else {
          e.preventDefault();
          e.stopPropagation();
        }
      }}><span class="mob">→</span><span class="desk">↓</span></a
    >
  </nav>

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
</main>

<style>
  /* Top navigation */
  .topnav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    background: var(--card);
    border-radius: 12px;
    box-shadow: var(--shadow);
    padding: 0.5rem;
    height: fit-content;
  }
  @media (max-width: 767px) {
    .topnav {
      position: sticky;
      top: 0;
      z-index: 20;
      margin: 0.75rem;
    }
  }
  @media (min-width: 1024px) {
    .topnav {
      position: sticky;
      top: 5.25rem;
      flex-direction: column;
      padding: 0.75rem;
    }
  }

  .iconbtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    height: 2.1rem;
    padding: 0 0.8rem;
    background: var(--muted);
    color: inherit;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    line-height: 1;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  @media (min-width: 1024px) {
    .iconbtn {
      margin: 0.25rem 0;
      min-width: 2.5rem;
      height: 2.5rem;
    }
  }
  .iconbtn[aria-disabled="true"] {
    opacity: 0.35;
    pointer-events: none;
  }
  .iconbtn .desk {
    display: none;
  }
  @media (min-width: 1024px) {
    .iconbtn .mob {
      display: none;
    }
    .iconbtn .desk {
      display: inline;
    }
  }

  /* Layout for photo + bio cards */
  .detail {
    padding: 0.75rem 1rem 2rem;
    display: grid;
    gap: 1rem;
    grid-template-areas:
      "nav"
      "photo"
      "bio";
  }
  @media (min-width: 1024px) {
    .detail {
      grid-template-columns: 1fr auto 1.2fr; /* bio | nav | photo */
      grid-template-areas: "bio nav photo";
      align-items: start;
      gap: 1.25rem;
    }
  }

  .card {
    background: var(--card);
    border-radius: var(--r);
    padding: 1rem;
    box-shadow: var(--shadow);
  }
  .topnav {
    grid-area: nav;
  }
  .photo {
    grid-area: photo;
  }
  .bio {
    grid-area: bio;
  }

  /* Photo card */
  .photo {
  }
  @media (min-width: 1024px) {
    .photo {
      position: sticky;
      top: 5.25rem;
    }
  }
  .mugshot {
    position: relative;
    margin: 0;
  }
  .mugshot img {
    display: block;
    width: min(100%, 420px);
    height: auto;
    border-radius: 16px;
    background: #ddd;
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.6) inset;
  }
  @media (min-width: 1024px) {
    .mugshot img {
      width: clamp(420px, 36vw, 560px);
    }
  }
  .chip {
    position: absolute;
    left: 50%;
    bottom: 0.9rem;
    transform: translateX(-50%);
    background: var(--chip-bg);
    color: #fff;
    padding: 0.55rem 0.95rem;
    border-radius: 14px;
    font-weight: 600;
    backdrop-filter: blur(6px);
    white-space: nowrap;
  }

  /* Bio card */
  .bio {
    max-width: 46ch;
  }
  .bio p {
    margin: 0;
    line-height: 1.6;
  }
  .visually-hidden {
    display: none;
  }
</style>
