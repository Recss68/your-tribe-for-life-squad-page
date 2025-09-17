<script>
  import { onMount } from "svelte";

  // Path to the logo
  let logo = "/img/logo.png";

  // Theme state: dark or light
  let isDark = false;

  // Website title
  let title = "FDND";

  // Function to toggle between light and dark theme
  function toggleTheme() {
    isDark = !isDark;
    // Add bg-dark class if isDark is true, otherwise bg-light
    document.body.classList.toggle("bg-dark", isDark);
    document.body.classList.toggle("bg-light", !isDark);
  }

  // Function to update the title based on screen width
  function updateTitle() {
    if (window.innerWidth >= 1024) {
      title = "Frontend Design & Development"; // Full title for large screens
    } else {
      title = "FDND";
    }
  }

  onMount(() => {
    document.body.classList.add("bg-light");
    updateTitle();
    window.addEventListener("resize", updateTitle);
  });
</script>

<header class="header">
  <!-- Left side of the header: logo -->
  <div class="header-left">
    <img src={logo} alt="Logo" class="logo" />
  </div>

  <!-- Center of the header: title -->
  <div class="header-center">
    <h1 class="text-h1">{title}</h1>
  </div>

  <!-- Right side of the header: theme toggle button -->
  <div class="header-right">
    <button class="btn" on:click={toggleTheme}>
      {isDark ? "☀️" : "🌙"}
      <!-- Show sun for dark mode, moon for light mode -->
    </button>
  </div>
</header>

<style>
  /* Header container */
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.8rem; /* smaller padding */
    position: sticky;
    top: 0;
    z-index: 50;

    /* liquid glass effect */
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow:
      0 3px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1.5px rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
  }

  /* Logo styling */
  .logo {
    height: 40px;
    width: auto;
  }

  /* Center of the header */
  .header-center {
    flex: 1;
    text-align: center;
  }

  /* Title styling */
  .text-h1 {
    font-family: var(--btn-font, "Montserrat", sans-serif);
    font-size: var(--text-size-md, clamp(1rem, 2vw, 16px));
    font-weight: 500;
    margin: 0;
    transition:
      font-size 0.3s ease,
      opacity 0.3s ease;
  }

  /* Button styling */
  .btn {
    display: inline-block;
    position: relative;
    z-index: 1;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-family: var(--btn-font, "Montserrat", sans-serif);
    font-weight: 600;
    text-align: center;
    cursor: pointer;

    /* liquid glass effect for button */
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow:
      0 3px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1.5px rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
  }

  .btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: inherit;
    z-index: 0;
  }

  .btn::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow:
      inset 1.5px 1.5px 2px rgba(255, 255, 255, 0.5),
      inset -1px -1px 1.5px rgba(255, 255, 255, 0.3);
    z-index: 0;
  }

  /* Button hover effect */
  .btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.02);
  }

  /* Styles for larger screens */
  @media (min-width: 1024px) {
    .header {
      padding: 0.8rem 1.5rem;
    }
    .logo {
      height: 60px;
    }
    .text-h1 {
      font-size: clamp(1.5rem, 3vw, 50px);
    }
  }
</style>
