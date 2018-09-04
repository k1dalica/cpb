<template>
  <header>
    <nav>
      <div class="logo">
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/images/cpb-photography-logo.png" alt="CpB Photography Logo">
        </router-link>
      </div>

      <ul id="menu">
        <li><router-link :to="{ name: 'Home' }"><span>Home</span></router-link></li>
        <li><router-link :to="{ name: 'About' }"><span>About</span></router-link></li>
        <li><router-link :to="{ name: 'Contact' }"><span>Contact</span></router-link></li>
      </ul>

      <div class="social-networks">
        <a href="https://www.facebook.com/SretenjeodVuletica/" target="_blank"><i class="icon fb" /></a>
        <a href="https://www.instagram.com/stretfordius/" target="_blank"><i class="icon insta" /></a>
        <a href="https://www.flickr.com/photos/cr_v/" target="_blank"><i class="icon flickr" /></a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MenuNav'
}
</script>

<style scoped>
  header { width: 100%; height: 70px; background-color: #fff; }
  header nav { padding: 0 70px; height: 100%; }
  header nav .logo { display: inline-block; float: left; margin-top: 10px; cursor: pointer; }

  header nav #menu { margin: 0px; padding: 0px; list-style: none; width: calc(100% - 382px); display: inline-block; text-align: center; font-family: 'ChopinScript'; font-size: 30px; color: #000; line-height: 70px; vertical-align: middle; }
  header nav #menu li { display: inline-block; margin: 0 10px; cursor: pointer; transition: all ease-out .2s; }
  header nav #menu li a.router-link-exact-active, header nav #menu li:hover { color: #0fabd0; }

  header nav .social-networks { display: inline-block; float: right; margin: 19px 0; }
  header nav .social-networks .icon { display: inline-block; vertical-align: top; width: 32px; height: 32px; margin-left: 5px; background-position: left; background-repeat: no-repeat; }
  header nav .social-networks .icon:hover {background-position: right; }
  header nav .social-networks .icon.fb {background-image: url(./../../assets/images/fb.png); }
  header nav .social-networks .icon.insta {background-image: url(./../../assets/images/insta.png); }
  header nav .social-networks .icon.flickr {background-image: url(./../../assets/images/fl.png); }
</style>
