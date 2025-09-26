# ng-ergo

## Projekty

- [Dla początkujących - UI dla Rick and Morty API](#rick-and-morty-api-ui)
- [Dla zaawansowanych - Fantasy Game](#fantasy-game)

## Harmonogram kursu Angular (Upskill)

| Data       | Temat zajęć                                                                                                               | Katalog z materiałami                       | Zrealizowano |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------ |
| 03/09 (śr) | [Wprowadzenie do kursu](#wprowadzenie-do-kursu)                                                                           | 0-angular-first-project                     | ✅           |
| 05/09 (pt) | [Signals API](#signals-api)                                                                                               | 01-signals-api                              | ✅           |
| 10/09 (śr) | [Podstawy: routing, struktura projektu, valibot](#podstawy-routingu-oraz-struktury-projektu-i-walidacja-danych-z-valibot) | 02-valibot-routing-project-structure-basics | ✅           |
| 12/09 (pt) | [Komunikacja między komponentami](#komunikacja-między-komponentami)                                                       | 03-components-data-flow-and-communications  | ✅           |
| 15/09 (pn) | [Dependency injection - podstawy](#dependency-injection---podstawy)                                                       | 04-dependency-injection-basics              | ✅           |
| 19/09 (pt) | [Reactive forms](#reactive-forms)                                                                                         | 05-reactive-forms                           | ✅           |
| 24/09 (śr) | Reactive forms 2                                                                                                          | 06-reactive-forms                           | ✅           |
| 26/09 (pt) | Reużywalne komponenty                                                                                                     | 07-reusable-components                      | ❌           |
| 01/10 (śr) |                                                                                                                           |                                             | ❌           |
| 03/10 (pt) |                                                                                                                           |                                             | ❌           |
| 08/10 (śr) |                                                                                                                           |                                             | ❌           |
| 10/10 (pt) |                                                                                                                           |                                             | ❌           |
| 15/10 (śr) |                                                                                                                           |                                             | ❌           |
| 17/10 (pt) |                                                                                                                           |                                             | ❌           |
| 22/10 (śr) |                                                                                                                           |                                             | ❌           |
| 24/10 (pt) |                                                                                                                           |                                             | ❌           |

### Wprowadzenie do kursu

- konfiguracja środowiska
- stworzenie projektu i wstęp do Angular CLI
- pierwsze spojrzenie na komponenty i signals API

### Signals API

- Signals API: `signal()`, `computed()`, `linkedSignal()`, `effect()`, `untrack()`
- Resource API: `resource()`, `httpResource()`
- Control Flow: @if @for @switch

### Podstawy routingu oraz struktury projektu i walidacja danych z valibot

- definicja routingu i nawigacja po projekcie
- lazy loading (routes/component)
- walidacja danych wejściowych przez valibot
- strukturyzowanie projektu

### Komunikacja między komponentami

- komunikacja parent -> child
- komunikacja child -> parent
- komunikacja sibling <-> sibling
- nowe API: `input()` `output()` `model()` `(<event>)` `[(<two-way>)]` `inject()`

### Dependency injection - podstawy

### Reactive Forms

- ***

### Rick and Morty API UI

**Projekt dla programistów backendowych rozpoczynających przygodę z Angularem**

#### Cel projektu

Stworzenie prostej aplikacji webowej wykorzystującej publiczne API Rick and Morty do wyświetlania informacji o postaciach, lokacjach i odcinkach serialu.

#### Wymagania funkcjonalne

##### Postaci (Characters)

1. **Lista postaci** - wyświetlanie kartek z podstawowymi informacjami (zdjęcie, imię, status, gatunek)
2. **Szczegóły postaci** - osobna strona/modal z pełnymi informacjami o postaci
3. **Wyszukiwanie postaci** - pole tekstowe do filtrowania po imieniu
4. **Filtry postaci** - filtrowanie po statusie (alive/dead/unknown) i gatunku
5. **Paginacja** - nawigacja między stronami wyników (API zwraca max 20 wyników na stronę)
6. **Ulubione postaci** - możliwość dodawania postaci do ulubionych (localStorage)

**API Endpoint:** `https://rickandmortyapi.com/api/character`

##### Lokacje (Locations)

1. **Lista lokacji** - wyświetlanie kartek z podstawowymi informacjami (nazwa, typ, wymiar)
2. **Szczegóły lokacji** - osobna strona/modal z pełnymi informacjami o lokacji
3. **Wyszukiwanie lokacji** - pole tekstowe do filtrowania po nazwie
4. **Filtry lokacji** - filtrowanie po typie i wymiarze
5. **Paginacja** - nawigacja między stronami wyników (API zwraca max 20 wyników na stronę)
6. **Ulubione lokacje** - możliwość dodawania lokacji do ulubionych (localStorage)

**API Endpoint:** `https://rickandmortyapi.com/api/location`

##### Odcinki (Episodes)

1. **Lista odcinków** - wyświetlanie kartek z podstawowymi informacjami (nazwa, kod odcinka, data emisji)
2. **Szczegóły odcinków** - osobna strona/modal z pełnymi informacjami o odcinku
3. **Wyszukiwanie odcinków** - pole tekstowe do filtrowania po nazwie
4. **Filtry odcinków** - filtrowanie po sezonie/kodzie odcinka
5. **Paginacja** - nawigacja między stronami wyników (API zwraca max 20 wyników na stronę)
6. **Ulubione odcinki** - możliwość dodawania odcinków do ulubionych (localStorage)

**API Endpoint:** `https://rickandmortyapi.com/api/episode`

##### Funkcje ogólne

1. **Loading states** - wskaźniki ładowania podczas pobierania danych
2. **Error handling** - obsługa błędów API (brak połączenia, 404, itp.)
3. **Responsive design** - aplikacja działająca na urządzeniach mobilnych
4. **Nawigacja** - menu nawigacyjne między sekcjami (Postaci/Lokacje/Odcinki)

#### API Endpoints i Dokumentacja

- **Ogólna dokumentacja:** https://rickandmortyapi.com/documentation
- **Postaci:** `https://rickandmortyapi.com/api/character`
- **Lokacje:** `https://rickandmortyapi.com/api/location`
- **Odcinki:** `https://rickandmortyapi.com/api/episode`

### Fantasy Game

**Projekt dla zaawansowanych programistów - aplikacja Fantasy Football**

#### Cel projektu

Stworzenie kompleksowego systemu Fantasy Football składającego się z trzech aplikacji korzystających z jednego codebase:

- **Admin Panel** - zarządzanie danymi systemu
- **Manager Panel** - zarządzanie ligami
- **Player App** - aplikacja dla graczy

#### Architektura

**Shared Codebase:**

- Wspólne komponenty UI
- Wspólne serwisy i modele danych
- Wspólna logika biznesowa
- System autoryzacji i ról

**Trzy oddzielne aplikacje:**

- `apps/admin/` - Panel administratora
- `apps/manager/` - Panel managera ligi
- `apps/player/` - Aplikacja gracza

#### Wymagania funkcjonalne

##### Admin Panel

**Zarządzanie zawodnikami:**

1. **CRUD zawodników** - dodawanie, edycja, usuwanie zawodników
2. **Import zawodników\*** - masowy import z pliku CSV/JSON
3. **Zarządzanie klubami** - dodawanie klubów, logo, kolory
4. **Ceny zawodników** - ustawianie i aktualizacja cen

**Zarządzanie rozgrywkami:**

1. **CRUD kolejek** - tworzenie harmonogramu kolejek
2. **CRUD meczów** - dodawanie terminów meczów
3. **Wprowadzanie wyników** - wyniki meczów, statystyki zawodników
4. **System punktacji** - konfiguracja zasad punktowania
5. **Deadline kolejek** - ustawianie terminów składów

**Zarządzanie systemem:**

1. **Dashboard administratora** - statystyki systemu
2. **Zarządzanie użytkownikami** - lista, blokowanie, role
3. **Moderacja** - zarządzanie zgłoszeniami, komentarzami
4. **Backup danych** - eksport/import całej bazy
5. **Logi systemu** - historia akcji w systemie

##### Manager Panel

**Zarządzanie ligą:**

1. **Tworzenie ligi** - nazwa, opis, zasady, limit uczestników
2. **Zaproszenia** - wysyłanie zaproszeń do ligi (email/link)
3. **Ustawienia ligi** - publiczna/prywatna, hasło, zasady punktacji
4. **Moderacja ligi** - usuwanie nieuaktywnych, czat ligi
5. **Historia ligi** - archiwum poprzednich sezonów

**Zarządzanie uczestnikami:**

1. **Lista uczestników** - aktywni gracze, statystyki
2. **Zatwierdzanie uczestników** - akceptacja wniosków o dołączenie
3. **Nadawanie uprawnień** - zastępcy managera, moderatorzy
4. **Komunikacja** - wiadomości do uczestników, ogłoszenia
5. **Ranking ligi** - tabela, nagrody, osiągnięcia

##### Player App

**Zarządzanie drużyną:**

1. **Budowanie składu** - wybór zawodników w ramach budżetu (15 zawodników)
2. **Formacja** - wybór 11 zawodników na kolejkę
3. **Kapitan/Wicekapitan** - podwojone/półtora punktu
4. **Transfery** - wymiana zawodników (limit na kolejkę)
5. **Historia składów** - poprzednie kolejki, zmiany

**Ligi i konkurencja:**

1. **Dołączanie do lig** - publiczne/prywatne, kod dostępu
2. **Tworzenie ligi** - dla znajomych, ustawienia
3. **Ranking globalny** - pozycja względem wszystkich graczy
4. **Ranking ligi** - pozycja w prywatnych ligach
5. **Mini-ligi** - wyzwania tygodniowe, head-to-head

**Analityka i statystyki:**

1. **Punkty na kolejkę** - szczegółowy breakdown punktów
2. **Historia transferów** - poprzednie decyzje, skuteczność
3. **Porównanie z rywalami** - analiza składów przeciwników
4. **Prognozy** - przewidywane punkty, trudność meczów
5. **Statystyki zawodników** - forma, historia, fixtures
