# Agents

## Zweck & Links

- Dashboard zum Agent-Setup des Laptops: https://agents.pleasance.org, nur aus dem Tailnet.
- Coolify auf VPS 3: Projekt `privat-agents`, Dienst `agents` (nginx, Volume `agents-site`). Betrieb und DNS: `~/dev/New AI Setup/infra.md`.
- Farbe und Zeichen nach `~/dev/starter/DESIGN.md` (Band 6,35–6,85).

## Checks

`python3 collect.py > /dev/null && bash -n publish.sh && node -e "new Function(require('fs').readFileSync('site/app.js','utf8'))"`

## Deploy

- Ein Push sichert nur den Code, er deployt nichts.
- `./publish.sh` sammelt die Daten neu und kopiert `site/` mit `data.json` per rsync ins Volume auf VPS 3. Automatisch über `agents-publish.path` und `agents-publish.timer` (aus `systemd/` nach `~/.config/systemd/user` verlinkt).
- Prüfen: `systemctl --user status agents-publish.service`, dann https://agents.pleasance.org im Tailnet laden.

## Fallen

- `data.json` gehört nie ins Repo, sie enthält interne Pfade, Hosts und Regeln.
- `collect.py` liest nur Konfiguration und Metadaten. Keine Werte aus `~/.secrets`, `auth.json` oder Token-Feldern von `~/.claude.json` und `~/.savor/state.json` hinzufügen.
- Texte der Oberfläche stehen in `site/app.js` unter `T.de` und `T.en`, neue immer in beiden Sprachen. Neue Hinweise in „Braucht Aufmerksamkeit“ brauchen einen Schlüssel in `collect.py` (`drift`) und Texte in beiden Sprachen.
- Der Router `agents-tailnet` in `/data/coolify/proxy/dynamic/tailnet-only.yaml` auf VPS 3 zeigt fest auf den Container `agents-ylcp43jvtrh3xba7dnfvddwk`. `publish.sh` kennt den Volume-Namen.
