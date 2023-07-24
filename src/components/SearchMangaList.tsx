import { useFetch } from "@raycast/utils";
import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import { GroupedManga, Manga } from "../types";
import { scrapeManga } from "../utils/scrapper";
import { monthNames } from "../utils/months";
import MangaListItem from "./MangaListItem";

export default function SearchMangaList() {
  const [month] = useState(monthNames[new Date().getMonth()]);
  const [year] = useState(new Date().getFullYear());
  const [mangaList, setMangaList] = useState<Manga[] | undefined>([]);
  const [filteredList, setFilteredList] = useState<Manga[] | undefined>();
  const [mangaGroupedByDate, setMangaGroupedByDate] = useState<GroupedManga | undefined>();
  const [searchText, setSearchText] = useState("");
  const { isLoading, data } = useFetch(
    `https://miscomics.com.mx/calendario/manga/${month}-${year.toString()}`,
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    scrapeManga(String(data) || "").then((result) => {
      setMangaList(result);
      setFilteredList(result);
    });
  }, []);

  useEffect(() => {
    if (searchText) {
      setFilteredList(mangaList?.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase())));
      return;
    }
    setFilteredList(mangaList);
  }, [searchText]);

  useEffect(() => {
    const mangaGroupedByDate: GroupedManga =
      filteredList?.reduce(
        (grouper: GroupedManga, manga: Manga) => ({
          ...grouper,
          [manga.publicationDate]: [...(grouper[manga.publicationDate] || []), manga],
        }),
        {}
      ) || {};
    setMangaGroupedByDate(mangaGroupedByDate);
  }, [filteredList]);

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      navigationTitle={`Latest releases ${month.toUpperCase()}-${year}`}
    >
      {mangaGroupedByDate &&
        Object.entries(mangaGroupedByDate).map(([date, mangaGroupedList], idx) => {
          return (
            <List.Section key={idx} title={date.toString()}>
              {mangaGroupedList.map((manga) => (
                <MangaListItem key={manga.name + manga.volume} manga={manga} />
              ))}
            </List.Section>
          );
        })}
    </List>
  );
}
