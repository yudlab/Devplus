<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/pman">Project Manager</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
/*@import '/src/assets/css/style.css';*/
</style>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #34495e;
  width: 100%;
  height: 60px;
  position: relative;


  a {
    font-weight: bold;
    color: #FFFFFF;
    padding: 0 15px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
