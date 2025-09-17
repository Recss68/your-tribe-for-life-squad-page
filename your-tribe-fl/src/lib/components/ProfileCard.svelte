<script>
    let { members } = $props();
</script>

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
          <a href="/{member.id}" onclick={(e) => navWithVT(e, `/${member.id}`)}>
            <img
              src={`https://fdnd.directus.app/assets/${member.mugshot}`}
              width="250"
              alt="student-{member.name}"
              style={`view-transition-name: mugshot-${member.id}`}
            />
            <p>{member.name}</p>
          </a>
        </div>
      {/if}
    {/each}
  </div>