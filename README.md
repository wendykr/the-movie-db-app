# Filmová databáze

Projekt adventní programovací výzvy ReactGirls a Lenovo

- [Zadání](#zadani)
- [Minimální požadavky](#minimalni-pozadavky)
- [Abstrakt](#abstrakt)
- [Rozsah a realizace](#rozsah-a-realizace)


## Zadání
Úkolem je vytvořit jednoduchou filmovou aplikaci s možností vyhledávat filmy v databázi.


## Minimální požadavky
Vytvořit alespoň 2 hlavní stránky:
- **1. Vyhledávací**
    - Výchozí stránka aplikace s výpisem všech filmů (plakát + název filmu).
    - Nahoře bude vyhledávání, které se spouští automaticky se začátkem psaní do pole (bez nutnosti stisknutí tlačítka).
    
- **2. Detail filmu**
    - Po kliknutí na film se zobrazí detailní informace o filmu - jako název filmu, režie, herecké obsazení atd.

Poznámka:  
- **Pro výpis filmů** lze použít veřejné API (např. [TheMovieDb](https://developers.themoviedb.org/3/getting-started/introduction))  
- **Inspirovat se** lze např. Netflix nebo HBO


## Abstrakt
Naprogramovaná aplikace inspirovaná Netflix s dominantními prvky černo-červeného designu.  

Na **hlavní stránce** aplikace se stahuje z API 10 náhodně seřazených filmů s možností jejich filtrování, přes automatické vyhledávání. Po kliknutí na vybraný film se zobrazí stránka s jeho detailem.  

Na **stránce s detailem** jsou informace – název, plakát, štítky kategorie, herecké obsazení, trailer a podobné filmy.  
- Kliknutím na kategorii štítku se zobrazí seznam filmů zařazených ve stejné kategorii.  
- Kliknutím na jméno herce se zobrazí detailním informace o herci. Pokud v API není - dostupný plakát filmu, zobrazí se defaultní plakát "NO IMAGE AVAILABLE".  
- Vedle originálního názvu filmu se zobrazuje ikona flag, kterou jsem využila místo textového údaje z API.  

Pokud server nedokáže najít požadovanou stránku na základě URL v adresním řádku prohlížeče, zobrazí se **chybová stránka 404**.


## Rozsah a realizace
Stručný výčet znalostí, které jsem v projektu využila. *Uvádím znalosti týkající se Reactu - responsivitu a technické znalosti HTML/CSS považuji v tomto projektu jako samozřejmost.*
- naprogramování celé aplikace v **Reactu**
- načítání a práce s daty z **veřejného API**
- práce s **`useState` a událostmi**
- formulářové prvky a **obousměrný data binding**
- **`useEffect` se závislostmi**
- **komunikace mezi komponentami**
- pokročilá komunikace **React Context** (`useContext`)
- použití hotové **React knihovny** ([React Router](https://reactrouter.com/en/main), [React Icons](https://react-icons.github.io/react-icons/), [React Flagkit](https://www.npmjs.com/package/react-flagkit))
- uložení projektu v repozitáři na **GitHubu** a jeho publikování na hostingovou službu **Netlify**