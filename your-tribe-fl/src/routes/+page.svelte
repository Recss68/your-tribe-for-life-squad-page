<script>
  let { data } = $props();
<<<<<<< HEAD
  const members = [...data.members].sort((a, b) => a.name.localeCompare(b.name));
=======
  const members = data.members;
  import { Spinning } from "$lib";
>>>>>>> origin/main
</script>

<div class="parent">
  <!-- HEADING GRID -->
  <div class="top-grid">
    <section class="home-heading">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, deserunt.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, deserunt.</p>
      <h2>Meet the members</h2>
    </section>
  </div>

  <!-- BOTTOM LEFT GRID -->
  <div class="left-grid">
    <section class="spinner-container">
      <h2>Placeholder for spinning text</h2>
    </section>
  </div>

  <!-- BOTTOM RIGHT GRID -->
  <div class="right-grid">
    <div class="sort-btns">
      <form>
        <!-- <select name="sort" id="sort"> -->
        <option value="default">Squad 2E</option>
        <option value="squad2h">Squad 2H</option>
        <!-- </select> -->
      </form>
    </div>

<<<<<<< HEAD
    <div class="profile-container">
      {#each members as member}
        {#if member.mugshot}
          <div class="profile-card">
            <img src={`https://fdnd.directus.app/assets/${member.mugshot}`} width="250" alt="student-{member.name}" />
            <a href="/{member.id}">{member.name}</a>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
=======
    <!-- BOTTOM LEFT GRID -->
    <div class="left-grid">
        <section class="spinner-container">
            <Spinning />
        </section>
    </div>

    <!-- BOTTOM RIGHT GRID -->
    <div class="right-grid"> 

        <div class="sort-btns">
            <form>
                <!-- <select name="sort" id="sort"> -->
                    <option value="default">Squad 2E</option>
                    <option value="squad2h">Squad 2H</option>
                <!-- </select> -->
            </form>
        </div>

        <div class="profile-container">
            {#each members as member}
                {#if member.mugshot}
                <div class="profile-card">
                    <a href="/{member.id}">
                        <img src="{`https://fdnd.directus.app/assets/${member.mugshot}`}" width="250" alt="student-{member.name}">
                        <p>{member.name}</p>
                    </a>
                </div>
                {/if}
            {/each}
        </div>

    </div>

</div> 






>>>>>>> origin/main
