# Changesets

Per ogni modifica che va pubblicata: `npm run changeset`, scegli patch/minor/major e scrivi una riga su cosa cambia.
Il file creato qui va committato insieme alla modifica. Su `main` la GitHub Action apre la PR "Version Packages";
quando la unisci, pubblica la nuova versione su GitHub Packages.
