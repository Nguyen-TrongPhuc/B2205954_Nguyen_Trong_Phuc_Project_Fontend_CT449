<script>
export default {
  name: "BookList",
  props: {
    books: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(book, index) in books"
      :key="book._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <div class="fw-bold">{{ book.title }}</div>
      <small class="text-muted">
        {{ book.author }} — {{ book.year }}
      </small>
    </li>
  </ul>
</template>

<style scoped>
.list-group {
  max-width: 500px;
  margin: 0 auto;
}
.list-group-item.active {
  background-color: #007bff;
  color: white;
}
</style>
