<template>
  <Form @submit="submitBook" :validation-schema="bookFormSchema">
    <!-- 📘 Tên sách -->
    <div class="form-group">
      <label for="title">Tên sách</label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="bookLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>

    <!-- ✍️ Tác giả -->
    <div class="form-group">
      <label for="author">Tác giả</label>
      <Field
        name="author"
        type="text"
        class="form-control"
        v-model="bookLocal.author"
      />
      <ErrorMessage name="author" class="error-feedback" />
    </div>

    <!-- 📅 Năm xuất bản -->
    <div class="form-group">
      <label for="published_year">Năm xuất bản</label>
      <Field
        name="published_year"
        type="number"
        class="form-control"
        v-model="bookLocal.published_year"
      />
      <ErrorMessage name="published_year" class="error-feedback" />
    </div>

    <!-- 📚 Thể loại -->
    <div class="form-group">
      <label for="genre">Thể loại</label>
      <Field
        name="genre"
        type="text"
        class="form-control"
        v-model="bookLocal.genre"
      />
      <ErrorMessage name="genre" class="error-feedback" />
    </div>

    <!-- ✅ Trạng thái có sẵn -->
    <div class="form-group form-check">
      <input
        name="available"
        type="checkbox"
        class="form-check-input"
        v-model="bookLocal.available"
      />
      <label for="available" class="form-check-label">
        <strong>Sách có sẵn</strong>
      </label>
    </div>

    <!-- 🎛️ Nút điều khiển -->
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="bookLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteBook"
      >
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-secondary" @click="Cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: { Form, Field, ErrorMessage },
  emits: ["submit:book", "delete:book"],
  props: {
    book: { type: Object, required: true },
  },
  data() {
    const bookFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Tên sách là bắt buộc.")
        .min(2, "Tên sách ít nhất 2 ký tự.")
        .max(100, "Tên sách tối đa 100 ký tự."),
      author: yup
        .string()
        .required("Tác giả là bắt buộc.")
        .max(50, "Tên tác giả tối đa 50 ký tự."),
      published_year: yup
        .number()
        .typeError("Năm xuất bản phải là số.")
        .required("Năm xuất bản là bắt buộc.")
        .min(1500, "Năm xuất bản không hợp lệ.")
        .max(new Date().getFullYear(), "Năm xuất bản không thể ở tương lai."),
      genre: yup
        .string()
        .max(50, "Thể loại tối đa 50 ký tự.")
        .required("Thể loại là bắt buộc."),
    });

    return {
      bookLocal: this.book,
      bookFormSchema,
    };
  },
  methods: {
    submitBook() {
      this.$emit("submit:book", this.bookLocal);
    },
    deleteBook() {
      this.$emit("delete:book", this.bookLocal._id);
    },
    Cancel() {
      const reply = window.confirm(
        "Bạn có chắc muốn thoát? Dữ liệu chưa lưu sẽ bị mất!"
      );
      if (!reply) return false;
      else this.$router.push({ name: "librarybook" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
