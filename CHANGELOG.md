# Comics Calendar Changelog

## [Initial Version] - 2023-07-23

- One view available: Current month schedule (list [simple]).
- In the list view, you can see a *detailed view* with the action "Cmd+Enter".
- In the list view, you can go to the web portals of the main sellers or to the publisher's official web site with the action "Cmd+Shift+Enter".

## [First Update] - 2023-07-24

- `SearchMangaList.ts` got a huge refactor.
  - Removed redundant state variables 'year' and 'filteredList'.
  - Utilized object destructuring for current date, month, and year.
  - Replaced redundant useEffect with useMemo for manga list filtering.
  - Used more descriptive variable names for better code readability.
  - The variable `acc` in the reduce function was renamed because wasn't descriptive.