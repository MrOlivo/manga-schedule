import { Icon, List } from "@raycast/api";
import { Manga } from "../types";

interface Props {
  manga: Manga;
}

export default function MangaListDetail({ manga }: Props) {
  const markdown = `
  ## ${manga.name} #${manga.volume}
  ![](${manga.frontImageUrl})`;

  return (
    <List.Item
      title={`${manga.name.split(" ").slice(0, -1).join(" ")} #${manga.volume}`}
      detail={
        <List.Item.Detail
          markdown={markdown}
          metadata={
            <List.Item.Detail.Metadata>
              <List.Item.Detail.Metadata.Label
                title="Publication Date"
                text={manga.publicationDate}
                icon={Icon.Calendar}
              />
              <List.Item.Detail.Metadata.Label title="Publisher" text={manga.editorial} icon={Icon.Book} />
              <List.Item.Detail.Metadata.Label title="Price" text={`$${manga.price}.00`} icon={Icon.Coins} />
            </List.Item.Detail.Metadata>
          }
        />
      }
    />
  );
}
