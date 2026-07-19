# ministerstwoporzadku.pl

## Google Search Console

GSC jest podłączone do tego projektu. **Właściwość: `sc-domain:ministerstwoporzadku.pl`** (domenowa,
uprawnienia `siteFullUser` — działa też URL Inspection).

Uwierzytelnianie: konto serwisowe współdzielone ze skillami `claude-seo`
(`~/.config/claude-seo/google-api.json` → `service_account.json`). Konto serwisowe:
`claude-seo@trim-hash-501807-q6.iam.gserviceaccount.com`.

Uwaga: globalny config ma `default_property: sc-domain:thenest.pl` (inny projekt). W tym repo **zawsze**
używaj `sc-domain:ministerstwoporzadku.pl` — skille SEO (`/seo`, `seo-google`) trzeba wywoływać z jawnie
podaną właściwością, bo inaczej wezmą domyślną z globalnego configu.

Dane w GSC mają ~2 dni opóźnienia; skrypt domyślnie kończy zakres 2 dni wstecz.

### `scripts/gsc.mjs`

Bez zależności npm (JWT podpisywany przez `node:crypto`), więc działa nawet bez `pnpm install`.

```bash
node scripts/gsc.mjs sites                                   # właściwości widoczne dla konta
node scripts/gsc.mjs query                                   # top 25 zapytań, ostatnie 28 dni
node scripts/gsc.mjs query --dim page --days 90 --limit 50   # top strony za kwartał
node scripts/gsc.mjs query --dim date --days 28              # trend dzienny
node scripts/gsc.mjs query --dim query --page /blog/         # zapytania tylko dla stron z /blog/
node scripts/gsc.mjs query --start 2026-01-01 --end 2026-03-31 --json
node scripts/gsc.mjs inspect https://ministerstwoporzadku.pl/blog/cargo-szuflady-czy-polki-kuchnia
```

Wymiary (`--dim`): `query`, `page`, `date`, `country`, `device`. `--property` nadpisuje właściwość
(np. `sc-domain:thenest.pl`), `--json` zwraca surową odpowiedź API.
