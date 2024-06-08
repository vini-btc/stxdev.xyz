import axios from "axios";
import { API_URL } from "../config";

/*
 * Connects to our back-end API
 */
export const apiClient = axios.create({
  baseURL: API_URL,
});
