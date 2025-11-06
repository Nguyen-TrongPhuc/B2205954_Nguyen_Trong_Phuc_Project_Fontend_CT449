<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <!-- 🌐 Tiêu đề ứng dụng -->
    <a href="/" class="navbar-brand">Ứng dụng Quản lý Mượn Sách</a>

    <!-- 🧭 Các mục điều hướng -->
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'librarybook' }" class="nav-link">
          Danh sách Sách
          <i class="fas fa-book"></i>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'borrowed-books' }" class="nav-link">
          Sách đang mượn
          <i class="fas fa-book-reader"></i>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'available-books' }" class="nav-link">
          Sách còn trong kho
          <i class="fas fa-box-open"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 18px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
