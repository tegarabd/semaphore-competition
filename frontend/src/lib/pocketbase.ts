import PocketBase from "pocketbase";

export const POCKET_URL = "http://127.0.0.1:8090";

const usePocket = () => {
  const pb = new PocketBase(POCKET_URL);
  return pb;
};

export default usePocket;
