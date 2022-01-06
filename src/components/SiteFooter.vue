<template>
  <footer>
    <div class="container flex justify-around align-center flex-wrap">
      <div>
        <div class="m-b-half m-t-half">&copy; {{ new Date().getFullYear() }} Catalog.</div>
        <div class="m-b-half">All rights reserved.</div>
      </div>
      <div :class="[
        'flex',
        'flex-column',
        this.breakpoint === 'xs' ? 'align-center' : 'align-start'
        ]">
        <div class="uppercase">Contact us by</div>
        <br>
        <div class="m-b-half">
          <v-icon
            name="envelope"
            scale="1"
          />&nbsp;&nbsp;<a
          class="blue hover-light-blue"
          href="mailto:test@google.com"
        >test@google.com
        </a>
        </div>
        <div>
          <v-icon
            name="phone-alt"
            scale="1"
          />&nbsp;&nbsp;<a class="blue hover-light-blue" href="tel:+380951111111">+380951111111</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SiteFooter',
  computed: {
    ...mapGetters({
      breakpoint: 'breakpoint',
    }),
  },
};
</script>

<style lang="scss" scoped>
footer {
  background: $gray;
  color: $white;
}

svg {
  fill: $white;
  vertical-align: middle;
}
</style>
