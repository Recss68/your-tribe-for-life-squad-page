<script>
  import { ProfileCard, Spinning } from "$lib";

  let { data } = $props();
  const members = data.members;

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

<div class="parent">
  <!-- HEADING GRID -->
  <div class="top-grid">
    <section class="home-heading">
      <p> FDND is dé HBO-opleiding voor Frontend Development in Nederland, in twee jaar stomen wij jou klaar voor het werkveld.</p>
      <p>Je leert bij ons niet alleen met de nieuwste technieken werken om websites te bouwen maar ook de softskills van het vak, zoals samenwerken en tijdinschatten. </p>
      <h2>meet 
        the 
        members</h2>
    </section>
  </div>

  <!-- BOTTOM LEFT GRID -->
  <div class="left-grid">
    <section class="spinner-container">
      <Spinning />
    </section>
  </div>

  <!-- BOTTOM RIGHT GRID -->
  <div class="right-grid">
    <ProfileCard {members}/>
  </div>
</div>
