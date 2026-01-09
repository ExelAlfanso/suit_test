import axios from "axios";

const suitApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SUIT_BASE_URL ||
    "https://suitmedia-backend.suitdev.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default suitApi;
