import API from "./api";

export const sendMessage = (message) => {
  return API.post("/ai/chat", { message });
};