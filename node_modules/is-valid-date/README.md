# is-valid-date

Validate date string.

## Valid formats

`DD/MM/YYYY`, `DD-MM-YYYY`, `DD.MM.YYYY`

# Install

```bash
npm install is-valid-date
```

# Usage

```javascript
var isValidDate = require('is-valid-date');

isValidDate('21/09/1991') // true
isValidDate('21/9/1991') // true
isValidDate('21.09.1991') // true
isValidDate('21-09-1991') // true
isValidDate('21-14.1991') // false
isValidDate('21/09/19991') // false
```

# License

MIT
