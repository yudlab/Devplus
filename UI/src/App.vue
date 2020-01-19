<template>
  <div id="app" class="cur-unavailable">
    <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/pman">Create</router-link> |
      <router-link to="/codeedit">Editor</router-link> 
    </div>
    <router-view/>
  </div>
</template>
<style src="./assets/css/all.css"></style>
<style lang="scss">
@font-face { 
    font-family: 'integral'; 
	src: url('./assets/webfonts/integralCF.woff'); }
@font-face { 
    font-family: 'brownprolight'; 
    src: url('./assets/webfonts/Brown Pro Light.otf'); } 
</style>
<style lang="scss">
html, body {
  height: 100%;
  font-family: 'brownprolight' !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  height: 100%;
  width: 100%;
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
    font-family: integral;
    letter-spacing: 1px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
