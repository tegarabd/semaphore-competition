import { ListResult, RecordModel } from "pocketbase";
import usePocket from "../lib/pocketbase";
import { Word, WordCount } from "../schema/word";

export const useWord = () => {
  const pb = usePocket();

  const getRandomWord = async (language: "id" | "en") => {
    const countRecord: WordCount & RecordModel = await pb()
      .collection("words_count_per_language")
      .getFirstListItem(`language = '${language}'`);

    const wordRecord: ListResult<Word & RecordModel> = await pb()
      .collection("words")
      .getList(Math.floor(Math.random() * countRecord.totalWords), 1, {
        filter: `language = '${language}'`,
      });

    return wordRecord.items[0];
  };

  return { getRandomWord };
};
