import API from "./api";

export const getPrices = () => {
  return API.get("/market");
};