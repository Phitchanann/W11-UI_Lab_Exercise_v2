# W11 UI Lab Exercise

This repository contains my work for ITDS362 Automated UI Testing Exercise, revision 2.0.

## Selected tool parts

- **Part 3: Robot Framework** — `robot/` contains the SeleniumLibrary web form checks and the QP-01 customer-to-admin scenario. From the repository root, install the pinned dependencies in a virtual environment, set `CHROMEDRIVER` to a matching ChromeDriver executable, then run `robot -d robot/results robot/pizza_scenario.robot`.
- **Part 4: Cypress** — `cypress/` contains the web form and QP-01 specs, a reusable admin login command, and video/screenshot configuration. From `cypress/`, run `npm ci` once, then `npx cypress run --browser chrome`.

The lab asks for public access so the instructor can open the submission. Credentials are not stored here; QP-01 uses the practice site's public demo account as specified by the exercise. Runtime evidence and manual Part 0 observations are recorded in `RESULTS.md` only after they are actually collected.
