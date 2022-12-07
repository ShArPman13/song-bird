import Sources, { ISourcesNews } from "./sources/sources";

export const drawFilteredNews = (data: ISourcesNews[], sources: Sources) => {
  const search = <HTMLInputElement>document.querySelector('.text-field__input');
  search?.addEventListener('input', (e) => {
    const filteredData = data.filter(el => el.name.toLowerCase().includes(search.value));
    sources.draw(filteredData);
  })
}