<template>
  <div id="app">
    <div class="wrap-nav">
      <nav>
        <router-link to="/about">About</router-link>
      </nav>

      <h1>
        <router-link to="/posts">DEHLIX</router-link>
      </h1>
    </div>
    <router-view />
    <footer>...</footer>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped>
#app {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 3.5rem 0 0;
}

footer {
  padding: 5rem 1rem;
  text-align: center;
  font-size: 1rem;
}

footer img {
  display: inline-block;
  height: 1em;
  width: auto;
}

.wrap-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: auto auto;
  z-index: 9;
  box-sizing: border-box;
}

nav {
  grid-column-start: 1;
  display: flex;
  align-items: center;
  font-size: 1rem;
  height: 3.5rem;
  justify-content: flex-start;
}

nav a {
  color: black;
  text-decoration: none;
  text-align: center;
  padding: 0 1rem;
  font-weight: 700;
  background-color: white;
  padding: 7px 14px;
  margin: 3px;
}

h1,
h1 a {
  grid-column-start: 2;
  justify-self: end;
  text-decoration: none;
  color: black;
  background-color: white;
  padding: 7px 14px;
  margin: 3px;
}
</style>

<style>
/* Global styles */

body {
  margin: 0;
  padding: 0;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.list {
  display: grid;
  margin: 0;
  padding: 0;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.list > li {
  display: block;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: stretch;
}

.list a {
  text-decoration: none;
  display: block;
  flex-grow: 1;
  color: #333;
}

.list h3 {
  margin: 0;
  padding: 0;
  line-height: 1em;
}

.list img {
  display: block;
  height: auto;
  width: 100%;
  margin-right: 0.5rem;
}
</style>
