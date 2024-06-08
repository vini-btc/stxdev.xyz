import axios from "axios";
import { BLOCKCHAIN_API_KEY, BLOCKCHAIN_API_URL } from "../config";

/*
 * Connects to a Stacks API
 */
export const blockchainApiClient = axios.create({
  baseURL: BLOCKCHAIN_API_URL,
  headers: {
    Authorization: `Bearer ${BLOCKCHAIN_API_KEY}`,
  },
});
