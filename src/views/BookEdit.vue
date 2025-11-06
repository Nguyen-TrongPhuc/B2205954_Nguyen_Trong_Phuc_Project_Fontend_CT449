<template>
  <div v-if="book" class="page">
    <h4>Hiệu chỉnh Sách</h4>

    <BookForm
      :book="book"
      @submit:book="updateBook"
      @delete:book="deleteBook"
    />

    <p>{{ message }}</p>
  </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";

export default {
  components: {
    BookForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      book: null,
      message: "",
    };
  },
  methods: {
    // 📖 Lấy thông tin sách theo ID
    async getBook(id) {
      try {
        this.book = await BookService.get(id);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sách:", error);
        // Nếu không tìm thấy sách, chuyển sang trang NotFound
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },

    // 💾 Cập nhật sách
    async updateBook(data) {
      try {
        await BookService.update(this.book._id, data);
        alert("Sách đã được cập nhật thành công.");
        this.$router.push({ name: "librarybook" });
      } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
      }
    },

    // 🗑️ Xóa sách
    async deleteBook() {
      if (confirm("Bạn có chắc muốn xóa sách này?")) {
        try {
          await BookService.delete(this.book._id);
          this.$router.push({ name: "librarybook" });
        } catch (error) {
          console.error("Lỗi khi xóa sách:", error);
        }
      }
    },
  },
  created() {
    this.getBook(this.id);
    this.message = "";
  },
};
</script>

<style scoped>
.page {
  max-width: 750px;
  margin: auto;
}
</style>
