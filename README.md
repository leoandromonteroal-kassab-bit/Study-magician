# Study Mage

Namn på alla deltagare

### Tävlar i kategori:
Webb / UI-UX / Programmering (välj den som passar)

---

## Projekt & Teknisk beskrivning

Study Mage är en webbaserad skolplattform som hjälper elever att organisera sin skoldag på ett tydligt och visuellt sätt. Projektet innehåller funktioner för schemahantering, uppgiftshantering (to-do-listor) samt användarkonton med inloggning. Målet med projektet är att skapa en lättanvänd och modern plattform som samlar skolrelaterad information på ett ställe.

Stor fokus har lagts på **UI/UX-design**, där en konsekvent färgpalett, tydliga ikoner och en återkommande figur (Study Mage) används för att skapa en igenkännbar och vänlig användarupplevelse. Layouten är inspirerad av moderna webbapplikationer och är uppdelad i tydliga sidor för olika funktioner, till exempel hem, schema och uppgifter.

### Teknisk beskrivning

Projektet är byggt med **HTML, CSS och JavaScript** och körs helt i webbläsaren utan server.

En viktig teknisk lösning i projektet är **användarhantering med sessioner**:
- När en användare skapar ett konto sparas kontot tillsammans med personliga uppgifter (schema och tasks) i webbläsarens `localStorage`.
- När användaren loggar in skapas en aktiv session med `sessionStorage`.
- Sessionen gör att användaren automatiskt loggas ut när webbläsaren eller fliken stängs, vilket ökar säkerheten.
- För att komma åt schemat och uppgifterna måste användaren vara inloggad.

Schemat är uppbyggt som ett **veckoschema som repeteras varje vecka**, vilket gör att användaren enkelt kan navigera mellan olika veckor utan att behöva skapa nya scheman varje gång. Uppgiftssystemet är kopplat till den inloggade användaren, vilket gör att varje användare endast ser sina egna uppgifter.

Alla sidor i projektet är uppdelade i separata filer för bättre struktur och underhållbarhet.

---

### Externt producerade komponenter

Projektet använder inga externa JavaScript-ramverk eller bibliotek. All funktionalitet är egenutvecklad.  
Ikoner används från öppna ikonbibliotek (t.ex. emoji eller enkla SVG-ikoner) för att förbättra användarupplevelsen. Bilder och illustrationer används för design och visuell identitet.

---

### Install

För att köra projektet krävs inga installationer.

1. Ladda ner eller klona projektet från GitHub.
2. Öppna projektmappen.
3. Starta `index.html` i en webbläsare  
   (eller använd t.ex. Live Server i VS Code).
4. Skapa ett konto och logga in för att använda plattformens funktioner.

Projektet körs helt lokalt i webbläsaren.
