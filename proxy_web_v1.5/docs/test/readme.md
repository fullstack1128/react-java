# Unit test
- Use `Jest`

### Test component
- Put in `tests/` in each component
- Name by format `*.test.js`
- Use `sinon` library to test saga. References: `https://redux-saga.js.org/docs/advanced/Testing.html`

### Test service
- Put in `services/tests/`
- Name by format `*.test.js`

## Usage
`npm test`

## Note
Remove `npm run lint` at line `"pretest": "npm run test:clean && npm run lint"` in file package.json to temp ignore eslint
