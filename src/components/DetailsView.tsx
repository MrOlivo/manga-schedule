import { List } from "@raycast/api";
import { Manga } from "@types";

interface Props {
  manga: Manga;
}

export default function ({ manga }: Props) {
  const markdown = `
  ## ${manga.name} #${manga.volume}
  ![](${manga.frontImageUrl})`;

  return (
    <List.Item.Detail
      markdown={markdown}
      metadata={
        <List.Item.Detail.Metadata>
          <List.Item.Detail.Metadata.Label title="Publication Date" text={manga.publicationDate} />
          <List.Item.Detail.Metadata.Label title="Publisher" text={manga.editorial} />
          <List.Item.Detail.Metadata.Label title="Price" text={`$${manga.price}.00`} />
        </List.Item.Detail.Metadata>
      }
    />
  );
}
