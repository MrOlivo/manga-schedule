import { Action, ActionPanel, Icon, Image, List } from "@raycast/api";
import DetailsView from "./DetailsView";
import { IManga } from "./types";

interface Props {
  manga: IManga;
}

export default function MangaListItem({ manga }: Props) {
  return (
    <List.Item
      title={`${manga.name} #${manga.volume}`}
      subtitle={manga.editorial}
      icon={{ source: manga.frontImageUrl, mask: Image.Mask.Circle }}
      accessories={[{ icon: Icon.Coins }, { text: `$${manga.price}.00` }]}
      actions={
        <ActionPanel>
          <Action.Push title="Details" target={<DetailsView manga={manga} />} />
          {manga.editorial.includes("Panini") && (
            <Action.OpenInBrowser
              title="Open in Panini"
              url={`https://tiendapanini.com.mx/catalogsearch/result/?q=${manga.name.replaceAll(" ", "+")}`}
              shortcut={{ modifiers: ["cmd"], key: "enter" }}
            />
          )}
          {manga.editorial.includes("Kamite") && (
            <Action.OpenInBrowser
              title="Open in Kamite"
              url={`https://kamite.com.mx/buscar?controller=search&poscats=0&s=${manga.name.replaceAll(" ", "+")}`}
              shortcut={{ modifiers: ["cmd"], key: "enter" }}
            />
          )}
          {manga.editorial.includes("Penguin") && (
            <Action.OpenInBrowser
              title="Open in Penguin Random House"
              url={`https://www.penguinlibros.com/mx/?mot_q=${manga.name.replaceAll(" ", "-")}#`}
              shortcut={{ modifiers: ["cmd"], key: "enter" }}
            />
          )}
          <Action.OpenInBrowser
            title="Open in Sanborns"
            url={`https://www.sanborns.com.mx/resultados?query=${manga.name.replaceAll(" ", "%2520")}`}
            shortcut={{ modifiers: ["cmd", "shift"], key: "1" }}
          />
          <Action.OpenInBrowser
            title="Open in Buscalibre"
            url={`https://www.buscalibre.com.mx/libros/search?q=${manga.name.replaceAll(" ", "+")}`}
            shortcut={{ modifiers: ["cmd", "shift"], key: "2" }}
          />
        </ActionPanel>
      }
    />
  );
}
