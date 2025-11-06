import { createWebHistory, createRouter } from "vue-router";
import LibraryBook from "@/views/LibraryBook.vue";

const routes = [
  {
    path: "/",
    name: "librarybook",
    component: LibraryBook,
  },
  // Thêm route cho "Sách đang mượn"
  {
    path: "/borrowed",
    name: "borrowed-books",
    // Tạm thời dùng component LibraryBook, bạn sẽ thay thế sau
    component: LibraryBook, 
  },
  // Thêm route cho "Sách còn trong kho"
  {
    path: "/available",
    name: "available-books",
    // Tạm thời dùng component LibraryBook, bạn sẽ thay thế sau
    component: LibraryBook,
  },
  {
path: "/:pathMatch(.*)*",
name: "notfound",
component: () => import("@/views/NotFound.vue"),
},
{
path: "/books/:id",
name: "book.edit",
component: () => import("@/views/BookEdit.vue"),
props: true // Truyền các biến trong $route.params vào làm props
},
{
  path: "/books/add",
  name: "book.add",
  component: () => import("@/views/BookAdd.vue")
},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
