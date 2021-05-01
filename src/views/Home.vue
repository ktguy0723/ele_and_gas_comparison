<template>
  <div class="container">
    <div class="alert alert-light" role="alert">
      本サイトは、各社の料金表をもとに(関東・一人暮らし)の電気・ガス料金の比較を目的としたものです。<br>
      特定の会社・プランを推奨しているものではありません。 <br>
      最終的な切替の決定は、ご自身の判断でなさるようにお願いいたします。
    </div>
    <ul class="nav nav-tabs justify-content-center row">
      <li class="nav-item col-4">
        <router-link to='/electricity' class="nav-link" active-class="active">電気</router-link>
      </li>
      <li class="nav-item col-4">
        <router-link to='/gas' class="nav-link" active-class="active">ガス</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'Home',
}
</script>

