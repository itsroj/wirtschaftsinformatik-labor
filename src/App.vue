<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

/* Moderne System-Schriftarten */
body {
  margin: 0;

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif;

  background:
    radial-gradient(circle at top left,
      #6fc2ff 0%,
      #4fa9e3 35%,
      #3188c8 100%);

  overflow-x: hidden;

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

button {
  font-family: inherit;
}
</style>
