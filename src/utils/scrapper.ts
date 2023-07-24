import * as cheerio from 'cheerio';
import { Collection, Manga } from '../types'

export async function scrapeManga(body: string): Promise<Manga[]> {
  try {
    const $ = cheerio.load(body);
    const Shelf: Manga[] = [];
    // Select by the 'comic' class and use the attr method to only grab the desired content
    // This work for both Calendario and Colección
    $('div.comic').map((_idx, el) => {
      const manga: Manga = {
        name: $(el).attr('data-c')?.split(" ").slice(0, -1).join(" ") || "",
        volume: $(el).attr('data-no') || "",
        price: $(el).attr('data-p') || "",
        editorial: $(el).attr('data-l') || "",
        publicationDate: $(el).attr('data-f') || "",
        url: $(el).attr('data-u') || "",
        frontImageUrl: $(el).find('img.nl').attr('src') || "",
      };
      Shelf.push(manga)
    });
    return Shelf;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function scrapeCollections(body: string) {
  try {
    const $ = cheerio.load(body);
    const Shelf: Collection[] = [];

    $('div.colex').map((_idx, el) => {
      const collection: Collection = {
        name: $(el).find('div.n').text() || "",
        url: $(el).find('a').attr('href') || "",
        frontImageUrl: $(el).find('img').attr('src') || "",
      };
      Shelf.push(collection)
    });
    return Shelf.filter(item => item.url.includes('manga'));
  } catch (error) {
    console.log(error);
    return [];
  }
}