# Ace Code Block Tool for Editor.JS

[Ace Code Editor](https://ace.c9.io/) block for the [Editor.js](https://editorjs.io/) with language selection. Take look demo at [ace-code-editorjs.pages.dev](https://ace-code-editorjs.pages.dev/)

## Usage

### Installation

Install this package using NPM, Yarn or PNPM:

```shell
npm i ace-code-editorjs
```

You also need install `ace-builds`:

```shell
npm i ace-builds
```

### Importing Module

Import module:

```javascript
import AceCodeEditorJS from "ace-code-editorjs";
```

**Important!** You must configure dynamic module import of ace, or import the language and configuring module url manualy!.

For example, if you using newest bundler like webpack 5, rollup, vite:

```javascript
import "ace-builds/esm-resolver";
```

If using older version (webpack 4):

```javascript
import "ace-builds/webpack-resolver";
```

You can read more about this in [Ace Documentation](https://ace.c9.io/#nav=howto).

### Configuring Plugin

There are 2 optional configuration parameter:

- `languages` : Configuring languages option. By default this plugin only load plain mode.
- `options` : Configuration options for ace. For example: `theme`, `minLines`, `fontSize`, etc. You can see complete list in [Ace GitHub Wiki](https://github.com/ajaxorg/ace/wiki/Configuring-Ace).

For `languages` the option must be object with string key as language output in data, value is object with key `label` (label of select option in editor) and `mode` (mode in ace). Example:

```javascript
const languages = {
  plain: {
    label: "Plain Text",
    mode: "ace/mode/plain_text",
  },
  html: {
    label: "HTML",
    mode: "ace/mode/html",
  },
  javascript: {
    label: "JavaScript",
    mode: "ace/mode/javascript",
  },
};
```

### Note For Worker

By default, Ace use worker for some language. You must import and configuring it manualy for dynamic import!. This is example of configuring worker url using vite:

```javascript
import modeHTMLWorker from "ace-builds/src-noconflict/worker-html?url";
import modeJSWorker from "ace-builds/src-noconflict/worker-javascript?url";
import modeCSSWorker from "ace-builds/src-noconflict/worker-css?url";
import modePHPWorker from "ace-builds/src-noconflict/worker-php?url";

ace.config.setModuleUrl("ace/mode/html_worker", modeHTMLWorker);
ace.config.setModuleUrl("ace/mode/javascript_worker", modeJSWorker);
ace.config.setModuleUrl("ace/mode/css_worker", modeCSSWorker);
ace.config.setModuleUrl("ace/mode/php_worker", modePHPWorker);
```

If you want, you can also disable ace worker with passing `{ useWorker: false }` in options config params.

## Complete Example

This is complete example using typescript and vite:

```typescript
import EditorJS from "@editorjs/editorjs";
import AceCodeEditorJS, { AceCodeConfig } from "ace-code-editorjs";
import ace from "ace-builds";
import "ace-builds/esm-resolver";

import modeHTMLWorker from "ace-builds/src-noconflict/worker-html?url";
ace.config.setModuleUrl("ace/mode/html_worker", modeHTMLWorker);

const aceConfig: AceCodeConfig = {
  languages: {
    plain: {
      label: "Plain Text",
      mode: "ace/mode/plain_text",
    },
    html: {
      label: "HTML",
      mode: "ace/mode/html",
    },
  },
  options: {
    fontSize: 16,
    minLines: 4,
    theme: "ace/theme/monokai",
  },
};

new EditorJS({
  placeholder: "Type Here...",
  holder: "editorjs",
  tools: {
    code: {
      class: AceCodeEditorJS,
      config: aceConfig,
    },
  },
});
```

You can also take a look at [source code of demo site](https://github.com/hsnfirdaus/ace-code-editorjs/blob/main/sites/ace-code-editorjs-site/src/main.ts) for complete working example.

## Output Data

Example block output data:

```json
{
  "id": "UidmH8dcer",
  "type": "code",
  "data": {
    "code": "<?php\nfunction removeSpace(string $str): string {\n    return str_replace(' ', '', $str);\n}\n?>",
    "language": "php"
  }
}
```
