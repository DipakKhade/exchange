import { Depth } from "./types";
import axios from "axios";

export const BASE_URL = "https://exchange-proxy.100xdevs.com/api/v1";

export async function getMarketDepth(market: string): Promise<Depth> {
  const res = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
  return res.data;
}
