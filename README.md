# 2024-backend-vc02-24

## Web-luik backend voor SDP2 Groep VC02

Dit JavaScript repo zal werken als backend server voor de Web applicatie van Delaware.

## de groepsleden:

- Tiemen Deroose
- Mohisha Van Damme
- Bas Stokmans
- Jasper Vandenbroucke
- Peter Cypers

## Requirements

- [NodeJS v20.6 or higher](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [MySQL v8](https://dev.mysql.com/downloads/windows/installer/8.0.html) (no Oracle account needed, click the tiny link below the grey box)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (no Oracle account needed, click the tiny link below the grey box)

For users of [Chocolatey](https://chocolatey.org/):

```powershell
choco install nodejs -y
choco install yarn -y
choco install mysql -y
choco install mysql.workbench -y
```

## Alvorens opstarten/testen van dit project

### Project verbinden met online database

Maak een nieuwe `.env` (development) file aan met deze template.

```ini
NODE_ENV=development
DATABASE_HOST=vichogent.be
DATABASE_PORT=40058
DATABASE_USERNAME=SDP2-2324-VC02
DATABASE_PASSWORD=q4X9eD0u1ze+S7q0D
```

### Project verbinden met lokale database

1. Maak een nieuwe `.env` (development) file aan met deze template.

```ini
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=<jouw_db_connectie_gebruikersnaam>
DATABASE_PASSWORD=<jouw_db_connectie_paswoord>
```

2. Maak een nieuw schema genaamd `sdp2_2324_db_vc02` aan in de lokale mysql database met mysql workbench

3. Voer het bestand `sdp2_2324_db_vc02.sql` uit op het aangemaakte schema met  mysql workbench, dit bestand is te vinden in de root van het project

## Project opstarten

- Installeer alle dependencies: `yarn`
- Maak een `.env` file aan (zie boven)
- Start de development server: `yarn start`

## Project testen

Maak een nieuwe `.env.test` (test) file aan met deze template.

```ini
NODE_ENV=test
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=<jouw_db_connectie_gebruikersnaam>
DATABASE_PASSWORD=<jouw_db_connectie_paswoord>
```

De tests gebeuren op een lokaal database connectie. Pas deze gegevens aan naar je eigen database connectie.

wij gebruiken localhost op poort 3306 (evt. aanpassen naar je eigen verkozen mysql-connectie)

- Installeer alle dependencies: `yarn`
- Maak een `.env.test` file aan (zie boven)
- Run de tests op de server: `yarn test`