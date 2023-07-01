import EditorJS from "@editorjs/editorjs";
import AceCodeEditorJS, { AceCodeConfig } from "ace-code-editorjs";
import ace from "ace-builds";
import "ace-builds/esm-resolver";
import * as Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-coy.css";

import modeHTMLWorker from "ace-builds/src-noconflict/worker-html?url";
import modeJSWorker from "ace-builds/src-noconflict/worker-javascript?url";
import modeCSSWorker from "ace-builds/src-noconflict/worker-css?url";
import modePHPWorker from "ace-builds/src-noconflict/worker-php?url";

ace.config.setModuleUrl("ace/mode/html_worker", modeHTMLWorker);
ace.config.setModuleUrl("ace/mode/javascript_worker", modeJSWorker);
ace.config.setModuleUrl("ace/mode/css_worker", modeCSSWorker);
ace.config.setModuleUrl("ace/mode/php_worker", modePHPWorker);

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
    javascript: {
      label: "JavaScript",
      mode: "ace/mode/javascript",
    },
    css: {
      label: "CSS",
      mode: "ace/mode/css",
    },
    php: {
      label: "PHP",
      mode: "ace/mode/php",
    },
    jsx: {
      label: "JSX",
      mode: "ace/mode/jsx",
    },
    tsx: {
      label: "TSX",
      mode: "ace/mode/tsx",
    },
    typescript: {
      label: "TypeScript",
      mode: "ace/mode/typescript",
    },
    sql: {
      label: "SQL",
      mode: "ace/mode/sql",
    },
  },
  options: {
    fontSize: 16,
    minLines: 4,
    theme: "ace/theme/monokai",
  },
};

const initialValue = {
  time: 1688216184926,
  blocks: [
    {
      id: "UidmH8dcer",
      type: "code",
      data: {
        code: "<?php\nfunction removeSpace(string $str): string {\n    return str_replace(' ', '', $str);\n}\n?>",
        language: "php",
      },
    },
  ],
  version: "2.27.2",
};

const editor = new EditorJS({
  data: initialValue,
  placeholder: "Add Block...",
  holder: "editorjs",
  tools: {
    code: {
      class: AceCodeEditorJS,
      config: aceConfig,
    },
  },
});

document
  .getElementById("show-result")
  ?.addEventListener("click", async (event) => {
    event.preventDefault();
    let data = await editor.save();
    let container = document.getElementById("result");
    if (container) {
      document.getElementById("result-container")?.classList.remove("hidden");
      let code = document.createElement("code");
      code.classList.add("language-json");
      code.innerHTML = Prism.highlight(
        JSON.stringify(data, undefined, 4),
        Prism.languages["json"],
        "json"
      );
      container.replaceChildren(code);
      container.scrollIntoView({ behavior: "smooth" });
    }
  });
