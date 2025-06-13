---
title: DBR PP - Adatbázis műveletek
position: 4
---

# dbrpp_db Projekt Dokumentáció

## Áttekintés

A **dbrpp_db** projekt egy adatfeldolgozó és adatbázis-kezelő rendszer, amely egy mobilalkalmazást támogat. Nyilvános és privát adatokat olvas be, dolgoz fel és tárol, naprakész statisztikákat és elemzéseket biztosítva. A rendszer több Python modulból áll `(adatbetöltés, számítás, adatbázis-kezelés, naplózás)`, amelyeket a `dbrpp_calc` szkript vezérel, különböző futási módokkal `(debug, run, schedule)`.

## Telepítés

1. Klónozd a repót és lépj be a projekt könyvtárba.
2. Függőségek telepítése:
   ```
   pip install -r requirements.txt
   ```
3. Környezeti változók beállítása a `.env` fájlban.
4. További információ: `README.md`.

## Könyvtárstruktúra

- `calculations.py`: Fő adatfeldolgozó és számítási logika.
- `conf_log.py`: Naplózás beállítása.
- `config.py`: Adatbázis és alkalmazás konfiguráció.
- `db.py`: Adatbázis kapcsolat és segédfüggvények.
- `dbrpp_calc`: Fő futtatható szkript.
- `loader.py`: Adatbetöltő és író függvények.
- `models.py`: SQLAlchemy ORM modellek.
- `Private.parquet`: Privát adatfájl.
- `processes.json`: Folyamatok nyilvántartása.
- `restart.sh`: Újraindító szkript.
- `logs/`: Naplófájlok könyvtára.
- `pl/`: Pluginek vagy további szkriptek.
- `results.md`: Kimeneti dokumentáció.

## Fő szkript futtatása

A fő szkript a `dbrpp_calc`. Főbb módjai:
- **schedule**: Ütemezett háttérfutás, percenként.
- **debug**: Hibakeresési mód, tesztadatbázissal.
- **run**: Egyszeri futtatás.

```
./dbrpp_calc --help
nohup ./dbrpp_calc -m schedule > logs/stdout.log 2>&1 &
./restart.sh
```

## Naplózás és konfiguráció

- **Naplózás**: `conf_log.py` állítja be, naplók a `logs/` könyvtárban.
- **Konfiguráció**: `config.py` és `.env` kezeli.

## Adatbázis és adatmodell

### SQLAlchemy modellek (`models.py`)

- `CC`: Árfolyam adatok (usd, time).
- `Rates`: Árfolyamok (r1, r2, r3, r4, time, votes, v1, v2, v3).
- `RatesA`: Alternatív árfolyamok (dbr_s, dbr, aa1, aa2, aa3, aa4, time).
- `DVotesAll`: Minden szavazat (created_at, ...).
- `DPartners`: Partner adatok.
- `DVotes`: Egyedi szavazatok.
- `Public`: Aggregált nyilvános adatok (time, dbr_display, btc_display, btc_color, btc_arrow, btc_pct_display, xau_display, ...).

Minden modell egy adatbázis táblához tartozik, mezőkkel, típusokkal és megszorításokkal a `models.py` szerint.

### Private.parquet

A `Private.parquet` egy Parquet formátumú privát adatfájl, amelyet a `loader.py` dolgoz fel és tölt be az adatbázisba.

## Adatfeldolgozás és számítás

- **Fő folyamat**: `calculations.py` és `dbrpp_calc` vezérli.
- `count_public_data` és `count_private_data`: aggregálás, feldolgozás, formázás.
- `loader.py`: `Private.parquet` olvasása, adatbázisba írás.
- `db.py`: Adatbázis kapcsolat és `ConnectionHandler` osztály.

## Tesztelés és validáció

- `format_test.py`: Egységtesztek.
- Futtatás:
  ```
  python format_test.py
  ```

## Konfiguráció és naplózás

- `config.py`: Adatbázis URL-ek, jogosultságok, beállítások.
- `conf_log.py`: Naplózás formátuma, szintje, kimenet.

## Folyamat és munkafolyamat

- `processes.json`: Folyamatok nyilvántartása.
- `restart.sh`: Újraindító szkript.
- Ütemezés: `schedule` a `dbrpp_calc`-ban, háttérben `nohup`-pal.

## Eredmények és kimenetek

- Kimeneti fájlok és naplók a `logs/` könyvtárban.
- `results.md`: Kimeneti formátumok és eredmények dokumentációja.

## Mermaid diagramok

### Magas szintű architektúra

```mermaid
graph TD
  A[dbrpp_calc] -->|hívja| B[calculations.py]
  A -->|hívja| C[loader.py]
  B -->|használja| D[db.py]
  C -->|olvas/ír| E[(Adatbázis)]
  C -->|olvas| F[Private.parquet]
  A -->|naplóz| G[logs/]
  A -->|használja| H[conf_log.py]
  A -->|használja| I[config.py]
  A -->|ütemezi| J[restart.sh]
  A -->|folyamat info| K[processes.json]
```

### Adatbázis séma (ER diagram)

```mermaid
erDiagram
  CC {
    TIMESTAMP time PK
    FLOAT usd
  }
  Rates {
    TIMESTAMP time PK
    FLOAT r1
    FLOAT r2
    FLOAT r3
    FLOAT r4
    INT votes
    INT v1
    INT v2
    INT v3
  }
  RatesA {
    TIMESTAMP time PK
    FLOAT dbr_s
    FLOAT dbr
    FLOAT aa1
    FLOAT aa2
    FLOAT aa3
    FLOAT aa4
  }
  DVotesAll {
    TIMESTAMP created_at PK
  }
  DPartners {
  }
  DVotes {
  }
  Public {
    TIMESTAMP time PK
    VARCHAR dbr_display
    VARCHAR btc_display
    VARCHAR btc_color
    INT btc_arrow
    VARCHAR btc_pct_display
    VARCHAR xau_display
  }
```

### Adatfolyam: Bemenet az adatbázisig

```mermaid
graph LR
  F[Private.parquet] --> C[loader.py]
  C --> B[calculations.py]
  B --> E[(Adatbázis)]
```

### Fő adatfeldolgozási folyamat

```mermaid
graph TD
  Start(Kezdés) --> Load[Adat betöltés loader.py]
  Load --> Process[Adatfeldolgozás calculations.py]
  Process --> Write[Írás az adatbázisba loader.py]
  Write --> End(Vége)
```

### Szkript futtatási sorrend

```mermaid
sequenceDiagram
  participant Felhasználó
  participant Szkript as dbrpp_calc
  participant Betöltő as loader.py
  participant Számítás as calculations.py
  participant DB as Adatbázis

  Felhasználó->>Szkript: dbrpp_calc futtatása
  Szkript->>Betöltő: Adat betöltése
  Betöltő->>Számítás: Számítási függvények hívása
  Számítás->>DB: Lekérdezés/frissítés
  Betöltő->>DB: Feldolgozott adatok írása
  Szkript->>Felhasználó: Kimenet/naplók
```

### Ütemezés és újraindítás folyamata

```mermaid
graph TD
  S[restart.sh] -->|indítja| P[dbrpp_calc -m schedule]
  P -->|ír| L[logs/]
  P -->|frissít| J[processes.json]
  P -->|futtat| T[calculations/loader]
```