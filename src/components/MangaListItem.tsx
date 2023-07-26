import { Action, ActionPanel, Icon, Image, List } from "@raycast/api";
import DetailsView from "./DetailsView";
import { Manga } from "../types";
import { getNormalizedParameter } from "../utils/normalize";

interface Props {
  manga: Manga;
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
          <ActionPanel.Section title="Open in...">
            {manga.editorial.includes("Panini") && (
              <Action.OpenInBrowser
                title="Panini"
                url={`https://tiendapanini.com.mx/catalogsearch/result/?q=${getNormalizedParameter(manga.name, "+")}`}
                shortcut={{ modifiers: ["cmd"], key: "enter" }}
              />
            )}
            {manga.editorial.includes("Kamite") && (
              <Action.OpenInBrowser
                title="Kamite"
                url={`https://kamite.com.mx/buscar?controller=search&poscats=0&s=${getNormalizedParameter(manga.name, "+")}`}
                shortcut={{ modifiers: ["cmd"], key: "enter" }}
              />
            )}
            {manga.editorial.includes("Penguin") && (
              <Action.OpenInBrowser
                title="Penguin Random House"
                url={`https://www.penguinlibros.com/mx/?mot_q=${getNormalizedParameter(manga.name, "-")}#`}
                shortcut={{ modifiers: ["cmd"], key: "enter" }}
              />
            )}
            {manga.editorial.includes("Mangaline") && (
              <Action.OpenInBrowser
                title="Mangaline México"
                url={`https://mangaline.com.mx/tienda/?product_cat&s=${getNormalizedParameter(manga.name, "+")}&post_type=product`}
                shortcut={{ modifiers: ["cmd"], key: "enter" }}
              />
            )}
            <Action.OpenInBrowser
              title="Sanborns"
              url={`https://www.sanborns.com.mx/resultados?query=${getNormalizedParameter(manga.name, "%2520")}`}
            />
            <Action.OpenInBrowser
              title="Buscalibre"
              url={`https://www.buscalibre.com.mx/libros/search?q=${getNormalizedParameter(manga.name, "+")}`}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
