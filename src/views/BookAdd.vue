<template>
  <div class="page">
    <h4>Thêm Sách</h4>
    <BookForm :book="book" @submit:book="createBook" />
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
  data() {
    return {
      book: {
        title: "",
        author: "",
        publisher: "",
        year: "",
        available: true,
      },
      message: "",
    };
  },
  methods: {
    // 🟩 Tạo mới sách
    async createBook(data) {
      try {
        await BookService.create(data);
        alert("Sách mới đã được thêm thành công!");
        this.$router.push({ name: "librarybook" });
      } catch (error) {
        console.error("Lỗi khi thêm sách:", error);
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
