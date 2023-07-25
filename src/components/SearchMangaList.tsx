import { useFetch } from "@raycast/utils";
import { List } from "@raycast/api";
import { useEffect, useMemo, useState } from "react";
import { MangaList } from "../types";
import { getMangaCalendar } from "../utils/scrapper";
import { monthNames } from "../utils/months";
import MangaListItem from "./MangaListItem";

export default function SearchMangaList() {
  const currentDate = new Date();
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const [mangaList, setMangaList] = useState<MangaList>({});
  const [searchText, setSearchText] = useState<string>("");

  const { isLoading, data } = useFetch(`https://miscomics.com.mx/calendario/manga/${currentMonth}-${currentYear}`, {
    keepPreviousData: true,
  });

  useEffect(() => {
    getMangaCalendar(String(data) || "").then((result) => {
      setMangaList(result);
    });
  }, [data]);

  const filteredMangaList = useMemo(() => {
    if (!searchText) {
      return mangaList;
    }

    const searchTitle = searchText.toLowerCase();
    return Object.entries(mangaList).reduce((filteredMangasByDate, [publicationDate, mangas]) => {
      const filteredMangas = mangas.filter(({ name }) => name.toLowerCase().includes(searchTitle));
      if (filteredMangas.length > 0) {
        filteredMangasByDate[publicationDate] = filteredMangas;
      }
      return filteredMangasByDate;
    }, {} as MangaList);
  }, [mangaList, searchText]);

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      navigationTitle={`Latest releases ${currentMonth.toUpperCase()}-${currentYear}`}
    >
      {filteredMangaList &&
        Object.entries(filteredMangaList).map(([date, mangasByDate], idx) => {
          return (
            mangasByDate && (
              <List.Section key={idx} title={date.toString()}>
                {mangasByDate.map((manga) => (
                  <MangaListItem key={manga.name + manga.volume} manga={manga} />
                ))}
              </List.Section>
            )
          );
        })}
    </List>
  );
}
