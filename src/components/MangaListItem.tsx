import DetailsView from "@components/DetailsView";
import { OpenPublisherStore } from "@components/OpenPublisherStore";
import { Action, ActionPanel, Color, Icon, Image, List } from "@raycast/api";
import { Manga } from "@types";

interface Props {
  manga: Manga;
  isShowingDetail: boolean;
  handleAction: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export function MangaListItem({ manga, isShowingDetail: showingDetail, handleAction }: Props) {
  const props: Partial<List.Item.Props> = showingDetail
    ? {
      detail: (
        <DetailsView manga={manga} />
      ),
    }
    : { accessories: [{ icon: Icon.Coins }, { text: `$${manga.price}.00` }] };
  return (
    <List.Item
      title={`${manga.name} #${manga.volume}`}
      icon={{ source: manga.frontImageUrl, mask: Image.Mask.Circle, fallback: Color.Blue }}
      {...props}
      actions={
        <ActionPanel>
          <Action
            title="Toggle Detailed View"
            onAction={() => handleAction((prev: boolean) => !prev)}
            icon={Icon.AppWindowSidebarLeft}
          />
          <ActionPanel.Submenu title="Search in...">
            <OpenPublisherStore
              publisher="Sanborns"
              title={manga.name}
              storeUrl="https://www.sanborns.com.mx/resultados?query={param}"
            />
            <OpenPublisherStore
              publisher="Buscalibre México"
              title={manga.name}
              storeUrl="https://www.buscalibre.com.mx/libros/search?q={param}"
            />
          </ActionPanel.Submenu>
        </ActionPanel>
      }
    />
  );
}
