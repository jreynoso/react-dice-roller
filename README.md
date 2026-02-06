# React Dice Roller

Single-page app for rolling a 6-sided die with custom display logic. The project is structured to keep domain logic separate from UI and to support TDD.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## Project layout

```
src/
  app/                App composition and entry wiring
  domain/             Pure business logic (no framework imports)
  features/           User-facing capabilities that orchestrate domain logic
  adapters/           Bridges between UI and domain/features (state, mappers)
  ui/                 Presentation layer (components, pages, styles)
  infrastructure/     External services (rng, storage, telemetry)
  test/               Shared test builders and setup
```

## Flow overview

- UI triggers a feature via a hook in `adapters/state/`.
- Feature calls domain logic and returns a result.
- Mapper in `adapters/mappers/` turns the result into display text.
