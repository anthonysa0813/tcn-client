import axios from "axios";

export const ServiceApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DB_URL}/services`,
});
