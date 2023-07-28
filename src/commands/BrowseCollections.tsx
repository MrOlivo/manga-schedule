import { Grid } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import { Collection } from "../types";
import { scrapeCollections } from "../utils/scrapper";
import CollectionGridItem from "../components/CollectionGridItem";
import usePagination from "../hooks/usePagination";

export default function CurrentMonthPublications() {
  const [collectionList, setCollectionList] = useState<Collection[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const { isLoading, data } = useFetch("https://miscomics.com.mx/manga", {
    keepPreviousData: true,
  });
  const { paginatedData, totalPages, setPage } = usePagination(collectionList);

  useEffect(() => {
    scrapeCollections(String(data) || "").then((result) => setCollectionList(result));
  }, [data]);

  const handlePageChange = (newValue: string) => setPage(Number(newValue) || 1);

  const renderDropdownItems = () => {
    return Array(totalPages)
      .fill(null)
      .map((_, idx) => <Grid.Dropdown.Item title={`Page ${idx + 1}`} value={String(idx + 1)} key={idx} />);
  };

  return (
    <Grid
      navigationTitle={`${collectionList.length} Manga collections were found`}
      isLoading={isLoading}
      columns={5}
      inset={Grid.Inset.Zero}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      filtering={true}
      searchBarAccessory={
        <Grid.Dropdown tooltip="Buscar" onChange={handlePageChange}>
          {renderDropdownItems()}
        </Grid.Dropdown>
      }
    >
      {paginatedData.map((collection, idx) => (
        <CollectionGridItem key={idx + collection.name} collection={collection} />
      ))}
    </Grid>
  );
}
