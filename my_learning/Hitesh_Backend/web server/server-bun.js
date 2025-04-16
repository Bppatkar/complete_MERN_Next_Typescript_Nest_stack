import { serve } from "bun";

serve({
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/")
      return new Response("Welcome to HOMEPAGE 🏠 ", { status: 200 });
    else if (url.pathname === "/about")
      return new Response("Welcome to About page 📚", { status: 200 });
    else if (url.pathname === "/profile")
      return new Response("Welcome to admin dashboard 👤", { status: 200 });
    else return new Response("404: Page not Found!! ❌", { status: 404 });
  },
  port: 8000,
  hostname: "127.0.0.1",
});

console.log("Server is running on http://127.0.0.1:8000");
// to check this we have to installed bun first
// i don't want to install it
