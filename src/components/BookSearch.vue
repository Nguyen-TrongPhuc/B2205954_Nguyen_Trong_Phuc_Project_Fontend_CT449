<script>
export default {
  name: "BookSearch",
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập tên hoặc tác giả sách cần tìm..."
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
    <div class="input-group-append">
      <button
        class="btn btn-outline-primary"
        type="button"
        @click="submit"
      >
        <i class="fas fa-search"></i> Tìm sách
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-group {
  max-width: 500px;
  margin: 0 auto;
}
</style>
