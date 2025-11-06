<script>
export default {
  name: "BookCard",
  props: {
    book: { type: Object, required: true },
  },
};
</script>

<template>
  <div class="card mt-3 shadow-sm">
    <div class="card-body">
      <h5 class="card-title text-primary fw-bold">
        {{ book.title }}
      </h5>
      <p class="card-text">
        <strong>Tác giả:</strong> {{ book.author }}
      </p>
      <p class="card-text">
        <strong>Nhà xuất bản:</strong> {{ book.publisher }}
      </p>
      <p class="card-text">
        <strong>Năm xuất bản:</strong> {{ book.year }}
      </p>
      <p class="card-text">
        <strong>Thể loại:</strong> {{ book.genre }}
      </p>
      <p class="card-text">
        <strong>Tình trạng:&nbsp;</strong>
        <span v-if="book.available" class="text-success fw-bold">
          Có sẵn
        </span>
        <span v-else class="text-danger fw-bold">
          Đã mượn
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 500px;
  margin: 0 auto;
}
</style>
