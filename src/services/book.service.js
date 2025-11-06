import createApiClient from "./api.service";

class BookService {
  constructor(baseUrl = "/api/books") {
    this.api = createApiClient(baseUrl);
  }

  // Lấy tất cả sách
  async getAll() {
    return (await this.api.get("/")).data;
  }

  // Thêm sách mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Xóa tất cả sách
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  // Lấy thông tin 1 sách theo ID
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Cập nhật thông tin sách
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa 1 sách theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // 📘 Lấy danh sách sách đang được mượn
  async getBorrowed() {
    return (await this.api.get("/borrowed")).data;
  }

  // 📗 Lấy danh sách sách còn trong kho
  async getAvailable() {
    return (await this.api.get("/available")).data;
  }
}

export default new BookService();
