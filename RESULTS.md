# UI lab results

Tool parts that I chose: Part 3 (Robot Framework) and Part 4 (Cypress)

## Part 0
- Step 0.1, Chrome version: pending local browser check
- Step 0.3, ChromeDriver version: pending matching driver setup
- Step 0.4, locator of Pizza, Please!: `button[name="pizza-please"]`
- Step 0.4, locator of Excluded tools: `select`
- Step 0.4, locator of Must be vegetarian: `#default-checkbox`
- Step 0.4, locator of Custom Pizza Name: `input#pizza-name`
- Step 0.5, pizza name, tool and calories of the run by hand: pending manual run

| Step | Actual result | Pass or fail |
|------|---------------|--------------|
| 1 | Pending manual run | Pending |
| 2 | Pending manual run | Pending |
| 3 | Pending manual run | Pending |
| 4 | Pending manual run | Pending |
| 5 | Pending manual run | Pending |
| 6 | Pending manual run | Pending |
| 7 | Pending manual run | Pending |

## Part 3: Robot Framework
- `robot --version`: pending installation
- Step 3.2, failure message for the wrong title: pending observed run
- Step 3.8, run 1, result, elapsed time and pizza name: pending run
- Step 3.8, run 2, result, elapsed time and pizza name: pending run

## Part 4: Cypress
- Node.js: 22.20.0; npm: 10.9.3; Cypress: pending `npm ci`
- Step 4.3, failure message for the wrong title: pending observed run
- Step 4.6, tool and calories in the answer of POST `/api/pizza`: pending observed run
- Step 4.7, the line of the admin list that shows your pizza: pending observed run
- Step 4.8, run 1, result, duration and pizza name: pending run
- Step 4.8, run 2, result, duration and pizza name: pending run
- Step 4.9 (optional), browser and result: not performed

## Part B

1. The three number fields share an id, so an id selector cannot uniquely identify Max Calories per Slice. Giving that input a unique id would make the test locator shorter and stable, and would also improve accessibility when the label is associated with the field.
2. Comparing the admin-list tool with the recommendation is a consistency oracle: it checks two views of the same created pizza. It would catch a fault where the admin list associates the wrong tool with a pizza.
3. The current UI does not expose a vegetarian result check in the exercise. A stronger test could check the response's `vegetarian` field or verify that every returned ingredient belongs to an authoritative vegetarian ingredient set; this requires the API response or a trusted ingredient source.
4. Complete after running both selected parts: record each tool's actual wait behavior, authoring time, and the clarity of its report/log/video. Do not estimate these from the source code alone.
5. Provisional choice: Cypress, because it provides built-in retrying assertions and request interception, and it records a full-run video. Confirm this choice against the actual runs before submission.
6. Part 3 keeps the calories locator in `robot/resources/quickpizza.resource`; changing it there repairs every test that uses the shared keyword.
7. Part 4 keeps the calories interaction in one Cypress test so cookies survive through the customer and admin steps. Splitting steps 6–7 into a second test would clear cookies and could show a different server's admin list.
