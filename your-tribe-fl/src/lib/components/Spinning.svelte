<script>
  // Rotation speed in seconds
  let speed = 90;  
  // Diameter of the circular text
  let size = 500;  
  // Font size in em
  let font = 1.7;  
  // Text to display in a circular path
  let text = 'Front-end Developer & Design ';  
  // How many times to repeat the text
  let repeat = 1;  
  // Create an array of characters repeated as needed
  let array = [];
  $: array = [...Array(repeat)]
    .map(() => [...text])
    .flat();
</script>

<!-- Circular text wrapper -->
<div class="seal-wrapper">
  <div class="seal" style="--size: {size}px; --speed: {speed * 100}ms; --font: {font}em">
    {#each array as char, index}
      <div class="char" style="--angle: {`${(1 / array.length) * index}turn`}">
        {char}
      </div>
    {/each}
  </div>
</div>

<style>
  /* ---------------------------------------------
     Wrapper for positioning the circular text
  --------------------------------------------- */
  .seal-wrapper {
    position: relative;
    width: var(--size);
    height: var(--size);
    margin: 50px auto 0; /* top margin can be adjusted */
    overflow: hidden; /* hide overflow outside the circle */
  }
  /* ---------------------------------------------
     Hide the circular text on mobile devices
  --------------------------------------------- */
  @media (max-width: 639px) {
    .seal-wrapper {
      display: none;
    }
  }
  /* ---------------------------------------------
     Rotation animation for the circular text
  --------------------------------------------- */
  @keyframes rotation {
    0%   { transform: rotate(0turn); }
    100% { transform: rotate(1turn); }
  }
  /* ---------------------------------------------
     Circular text container
  --------------------------------------------- */
  .seal {
  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  animation: rotation var(--speed) linear infinite; /* continuous rotation */
  font-family: 'Montserrat', sans-serif;
  font-size: var(--font);
  color: var(--text-color); /* <-- gebruik de globale variabele */
  }
  /* ---------------------------------------------
     Individual characters positioned around the circle
  --------------------------------------------- */
  .char {
    width: 1em;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) rotate(var(--angle, 0deg));
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
</style>