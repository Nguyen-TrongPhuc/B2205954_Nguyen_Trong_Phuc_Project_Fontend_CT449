<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div id="app">
    <!-- 🏷️ Thanh tiêu đề -->
    <AppHeader />

    <!-- 📖 Khu vực hiển thị nội dung -->
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 750px;
  margin: auto;
}

.container {
  padding-bottom: 40px;
}
</style>
