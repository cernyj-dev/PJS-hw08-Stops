# BI-PJS hw-08

### Hlavní součásti aplikace:
* **hw-08-index.html** - Zadání a výchozí HTML struktura. Tento soubor nesmíte přímo měnit.
* **hw-08.js** - Prostor pro vaše řešení.
* **hw-08-helper.js** - Pomocné funkce, které budete volat ze svého kódu - již navěšené na `window` objekt.
* **data/** - Lokální kopie online dostupných dat.
* **test/** - Složka s testy. Můžete se podívat, co testují, nesmíte je ale měnit.

### Co je potřeba ke spuštění:
* _libovolný browser_ - pro lokální testování,
* `node` - pro lokální spouštění testů,
* `npm` - pro instalaci závislosti,
* `jest` - pro lokální spouštění testů,
* _můžete použít Docker, oficiální kontejner pro BI-PJS ale nenabízíme, konfigurace je tedy na vás._

### Jak spouštět a testovat:
* `npm install` - stačí jen jednou po stažení repozitáře,
* otevřete `hw-08-index.html` ve vašem prohlížeci - na window objekt jsou již nalinkované všechny funkce.
* * Váš kód z `hw-08.js` se spustí automaticky.
* * Nezapomeňte provést refresh stránky, když kód změníte.
* `npm test` - spuštění připravených testů.

### Jak odevzdávat v rámci Gitlabu:
* vytvořte novou branch nazvanou **solution** `git checkout -b solution`,
* vypracujte vaše řešení, otestujte ho,
* pushněte na git `git push`,
* na Gitlabu vytvořte merge request `solution -> master`.

### Obecné pokyny:
* **Na vypracování DÚ máte necelých 14 dnů - termín je půlnoc ze středy na čtvrtek**.
    * Za čas odevzdání se považuje čas posledního pushnutého commitu v tomto termínu.
    * Commity provedené či pushnuté po termínu nebudou hodnoceny.
* Pokud chcete, můžete vytvořit další pomocné soubory s kódem.
* Necommitujte další vygenerované soubory např. s konfigurací IDE aj. Můžete je přidat do .gitignore.
* Lokálně můžete používat i jiný interpret než node a jiný package manager než npm.
    * V prostředí automatických testů bude použit právě node a npm.
* Nepoužívejte Typescript.
* Nepřidávejte další závislosti.
* Neměňte implementaci testů.
* 100% průchod automatickými testy **neznamená** zisk 100% bodů. Řešení bude kontrolováno i ručně. Pokusy o obejití automatizované kontroly budou hodnoceny 0 body bez možnosti náhrady.
