# Dropdown Option 2 Test Plan

## Planner Agent (scenario steps)
1. Navigate to `https://the-internet.herokuapp.com/dropdown`.
2. Locate the dropdown with selector `#dropdown`.
3. Select the item labeled "Option 2".

## Generator Agent (test implementation steps)
1. Create a Playwright test using the `page` fixture.
2. Call `selectOption` on `#dropdown` with the label "Option 2".
3. Assert the dropdown value is `2`.
4. Assert the checked option text is "Option 2".
