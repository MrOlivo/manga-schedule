import { ListItem } from "@components/ListItem";
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
  const [showingDetail, setShowingDetail] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      getMangaCollection(String(data)).then((result) => setMangaList(result));
    }
  }, [data]);

  return (
    <List
      isShowingDetail={showingDetail}
      isLoading={isLoading}
      searchText={searchText}
      navigationTitle={`Viewing: ${title}`}
      onSearchTextChange={setSearchText}
      filtering
    >
      {mangaList.map((manga: Manga) => {
        return <ListItem key={manga.id} manga={manga} isShowingDetail={showingDetail} handleAction={setShowingDetail} />
      })}
    </List>
  );
}
