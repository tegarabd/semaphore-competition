import { RecordModel } from "pocketbase";
import { ID_WORDS_COUNT } from "../lib/constant";
import usePocket from "../lib/pocketbase";
import { Word } from "../schema/word";

export const useWord = () => {
  const pb = usePocket();

  const getRandomWord = async () => {
    const record = await pb()
      .collection("words")
      .getList(Math.floor(Math.random() * ID_WORDS_COUNT), 1, {
        filter: "language = 'id'",
      });

    return record.items[0] as Word & RecordModel;
  };

  return { getRandomWord };
};
