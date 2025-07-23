# Scalable softwares - Great homework

## About the project

This homework assignment is based on another homework assignment that four of us completed. I completed the project in the frontend folder shown here on my own. In the current homework assignment, I broke down the completed backend software into microservices.

## Overview of the original software (in this homework only the "Dolgozói alkalmazás funkciói" functions are available)

A szoftver célja egy étterem adminisztrációjának digitalizációja.
Ennek során a következő elemek kerülnek lefejlesztésre

- asztal nyilvántartás
- foglalás
- alapanyag nyilvántartás
- rendelés
- számlázás
- visszajelzés
- hűségpont és kupon
- munkabeosztás
- borravaló

Ezek a következőknek lesznek elérhető

- admin (manager)
- pincérek
- konyhai dolgozók
- ügyfelek

Ezeket a következő technológiákkal kerülnek megvalósításra

- Adatbázis: MSSQL
- Backend: ASP.NET C#
- Frontend
  - Dolgozók: Angular
  - Ügyfelek: Ionic Angular

## Felhasználó menedzsment

Ügyfél oldalon:

- bejelentkezhetnek, illetve regisztrálhatnak a vásárlók (név, email, jelszó)

Dolgozói oldalon:

- admin
  - eleve hozzá lesz adva az adatbázishoz, 1 darab
  - létre tud hozni dolgozói fiókokat, amik random generált jelszóval rendelkeznek (létrehozás után megjelenik, utána nem megtekinthető)
- munkavállalók
  - bejelentkeznek előre generált jelszóval, amit utána kötelezően megváltoztatnak az első belépéskor

## Vásárlói alkalmazás funkciói

- bejelentkezés, regisztráció
- profil:
  - név, email, jelszó, cím, telefonszám, ebből módosíthatók: cím, telefonszám
- főoldal/ételek:
  - elérhető ételek (név, kép, ár),
  - kosárba lehet helyezni (mennyiség a kosárban állítható, kosárba helyezéskor alapértelmezetten 1 kerül felvételre)
- kuponok:
  - összegyűjtött pontok láthatók, listában az elérhető kuponok
  - kupon kosárba helyezhető
  - kosárba helyezéskor levonódik a pontokból a kupon ára (utólag ez visszavonható a kosáron keresztül a kupon törlésével)
  - egyes kuponok csak bizonyos vásárlási összeg fölött alkalmazhatóak
  - a kuponok vagy százalékos vagy adott összegű kedvezményt adnak
- kosár:
  - kosárba helyezett termékek egy lisában
  - termékek mennyiségei változtathatóak (ha 0-ra állítjuk, akkor kikerül a kosárból)
  - rendelés gomb megnyomásakor felajánlja az alapértelmezett címet (ami a profilban be van állítva), de megadható másik cím egy adott rendeléshez, ez nem kerül mentésre,
  - telefonszám ugyanúgy, mint a cím
  - cím és telefonszám megadása után leadható a rendelés, ezt követően átnavigál az alkalmazás a rendelések nézetre
- rendelések:
  - aktív rendelések felül, ezeknél látszik az állapot
  - ha elutasításra kerül a rendelés és használt kupont a felhasználó, akkor a hűségpont visszakerül a fiókra
  - aktív rendelések alatt a korábbi, már befejeződött rendelések láthatók
  - borravaló:
    - 4 opció: nincs, 5%, 10%, 15%
  - rendelés időpontja
  - házhoz megy
  - már kész rendeléseknél: generált számla (pdf)
- fizetés (nem nézet, nem a szoftver része):
  - applikáción keresztül történő rendelés esetén a futárnál (utánvétellel)
  - étteremben a pincérnél
- értékelés:
  - egy felhasználó bármennyi értékelést küldhet
  - egy értékelés a következőkből áll
    - 5 csillag (0-5ig lehet küldeni)
    - szöveges megjegyzést
    - rendelés módjának kiválasztása (helyben fogyasztás/házhoz szállítás)

## Dolgozói alkalmazás funkciói

- be/kijelentkezés
- pincér nézetei:
  - foglalások:
    - foglalás felvétele (asztal, időpont (mettől meddig), létszám, foglaló)
    - foglalás listázása (naptár nézet)
    - foglalás törlése
  - személyes (helybeni) rendelések:
    - személyes rendelés felvétele (asztal, vásárló, ételek, végösszeg, borravaló)
    - helybeni rendelés
- menedzser nézetei:
  - beérkezett rendelések:
    - online rendelések elfogadása/elutasítása
    - állapotok: beérkezett (függőben lévő), elfogadva, elkészítés alatt, kiszállítás alatt, kiszállítva (teljesítve)
    - elfogadva állapotba kerülés esetén automatikusan generálódik a számla
  - asztalok:
    - asztalok felvétele, törlése
  - készletek:
    - az étteremben rendelkezésre álló alapanyagok listája (kereséssel)
      - alapanyag tulajdonságai: név, mennyiség
    - létrehozása, törlése
    - darabszámok növelése/csökkentése
  - dolgozók nézet:
    - dolgozói fiókok kezelése
    - új fiókok létrehozása és törlése
      - szerepkör (konyhás, pincér, ügyfél)
  - munkabeosztás nézet:
    - 2 táblázat: pincérek, konyhai dolgozók
      - tulajdonságok: dolgozó, mettől, meddig
    - nyitvatartás beállítása a hét napjaira külön-külön
    - dolgozók hozzárendelése az idősávokhoz
    - munkaerővel lefedve a nyitás, zárás, elegendő ember (1-2 pincér és konyhai dolgozói van minimum)
  - ételek nézet
    - létrehozás, törlés
    - étel tulajdonságai: név, kép, ár, leírás
  - visszajelzések
    - listázás
    - átlag
  - kuponok
    - létrehozás
      - szabályok (lásd korábbi rész), ár (mennyi hűségpontba kerül)
    - törlés
  - borravalók nézet:
    - borravalók szétosztása algoritmus kiválasztásával
      - mindenki ugyanannyit (munkaidő arányos)
      - csak az aktuálisan dolgozók (a munkaidő arányában)
