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

<nav class="topnav">
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

<style>
  /* Top navigation */
  .topnav {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    margin: 0.75rem;
    background: var(--card);
    border-radius: 12px;
    box-shadow: var(--shadow);
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
  .iconbtn[aria-disabled="true"] {
    opacity: 0.35;
    pointer-events: none;
  }

  /* Layout for photo + bio cards */
  .detail {
    padding: 0.75rem 1rem 2rem;
    display: grid;
    gap: 1rem;
  }
  @media (min-width: 760px) {
    .detail {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
    .photo {
      position: sticky;
      top: 5.25rem;
    }
  }

  .card {
    background: var(--card);
    border-radius: var(--r);
    padding: 1rem;
    box-shadow: var(--shadow);
  }

  /* Photo card */
  .photo {
    display: flex;
    justify-content: center;
  }
  .mugshot {
    position: relative;
    margin: 0;
  }
  .mugshot img {
    display: block;
    width: min(100%, 380px);
    height: auto;
    border-radius: 16px;
    background: #ddd;
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.6) inset;
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

  /* A11y helper for hidden heading */
  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
    border: 0;
    padding: 0;
    margin: -1px;
  }
</style>
