<template>
  <div class="parent">
    <Header />
    <div class="main">Test App</div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "JobsiteHomeView",
  components: { Header, Footer },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
</style>