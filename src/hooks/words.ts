import { ListResult, RecordModel } from "pocketbase";
import usePocket from "../lib/pocketbase";
import { Language, Word, WordCount } from "../schema/word";

export const useWord = () => {
  const pb = usePocket();

  const getTotalWords = async (language: Language) =>
    (await pb
      .collection("words_count_per_language")
      .getFirstListItem(`language = '${language}'`)) as RecordModel & WordCount;

  const getRandomWord = async (language: Language) => {
    const countRecord = await getTotalWords(language);

    const wordRecord: ListResult<Word & RecordModel> = await pb
      .collection("words")
      .getList(Math.floor(Math.random() * countRecord.totalWords), 1, {
        filter: `language = '${language}'`,
      });

    return wordRecord.items[0];
  };

  return { getRandomWord };
};
