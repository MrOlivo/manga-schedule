import { MangaListItem } from "@components/MangaListItem";
import { List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { Manga } from "@types";
import { getMangaCollection } from "@utils/scrapper";
import { useEffect, useState } from "react";

interface Props {
  url: string;
  title: string;
}

export function CollectionListView({ url, title }: Props) {
  const { isLoading, data } = useFetch(url);
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (data) {
      getMangaCollection(String(data)).then((result) => setMangaList(result));
    }
  }, [data]);

  return (
    <List
      isLoading={isLoading}
      searchText={searchText}
      navigationTitle={`Viewing: ${title}`}
      onSearchTextChange={setSearchText}
      filtering
    >
      {mangaList.map((manga) => (
        <MangaListItem key={manga.id} manga={manga} />
      ))}
    </List>
  );
}
