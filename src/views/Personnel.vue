<template>
  <div class="home">
    <Navbar />
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <v-spacer></v-spacer>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/personnel/PersonnelNavBar";
import Footer from "@/components/Footer";
export default {
  name: "Personnel",
  components: { Navbar, Footer },
  data: function() {
    return {
    };
  },
  created() {},
  methods: {}
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

