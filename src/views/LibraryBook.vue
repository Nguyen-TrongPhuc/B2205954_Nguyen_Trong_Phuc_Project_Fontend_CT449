<template>
  <div class="page row">
    <!-- 🔍 Thanh tìm kiếm -->
    <div class="col-md-10">
      <BookSearch v-model="searchText" />
    </div>

    <!-- 📚 Danh sách sách -->
    <div class="mt-3 col-md-6">
      <h4>
        Danh sách Sách
        <i class="fas fa-book"></i>
      </h4>

      <BookList
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có sách nào.</p>

      <!-- 🔘 Các nút thao tác -->
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddBook">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllBooks">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <!-- 📖 Chi tiết sách -->
    <div class="mt-3 col-md-6">
      <div v-if="activeBook">
        <h4>
          Chi tiết Sách
          <i class="fas fa-book-open"></i>
        </h4>
        <!-- 🔁 Sử dụng BookCard thay cho BookDetail -->
        <BookCard :book="activeBook" />
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import BookSearch from "@/components/BookSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";

export default {
  name: "LibraryBook",
  components: {
    BookCard,
    BookSearch,
    BookList,
  },
  data() {
    return {
      books: [], // 📘 Danh sách tất cả sách từ server
      activeIndex: -1, // 📌 Vị trí sách đang chọn
      searchText: "", // 🔍 Từ khóa tìm kiếm
    };
  },
  watch: {
    // Khi searchText thay đổi → bỏ chọn sách hiện tại
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển mỗi sách thành chuỗi để dễ tìm kiếm
    bookStrings() {
      return this.books.map((book) => {
        const { title, author, publisher, year } = book;
        return [title, author, publisher, year].join("");
      });
    },
    // Lọc danh sách theo từ khóa tìm kiếm
    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((_book, index) =>
        this.bookStrings[index]
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    },
    // Trả về sách đang được chọn
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    // Số lượng sách sau khi lọc
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    // 📥 Lấy danh sách sách từ server
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.error("Lỗi khi tải danh sách sách:", error);
      }
    },
    // 🔁 Làm mới danh sách
    refreshList() {
      this.retrieveBooks();
      this.activeIndex = -1;
    },
    // ➕ Chuyển đến trang thêm sách
    goToAddBook() {
      this.$router.push({ name: "book.add" });
    },
    // ❌ Xóa toàn bộ sách
    async removeAllBooks() {
      if (confirm("Bạn có chắc muốn xóa tất cả sách không?")) {
        try {
          await BookService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.error("Lỗi khi xóa tất cả sách:", error);
        }
      }
    },
  },
  mounted() {
    // Khi component được tạo, tự động tải danh sách sách
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
  margin: 0 auto;
}
</style>
