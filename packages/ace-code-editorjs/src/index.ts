import ace from "ace-builds";
import { IconBrackets } from "@codexteam/icons";
import {
  API,
  BlockToolConstructorOptions,
  BlockTool,
} from "@editorjs/editorjs";

export interface AceCodeData {
  code: string;
  language: string;
}
interface AceCodeLanguages {
  [key: string]: {
    mode: string;
    label: string;
  };
}
export interface AceCodeConfig {
  options?: Partial<Omit<ace.Ace.EditorOptions, "readOnly" | "value" | "mode">>;
  languages: AceCodeLanguages;
}
const DEFAULT_LANGUAGES: AceCodeLanguages = {
  plain: {
    mode: "ace/mode/plain_text",
    label: "Plain Text",
  },
};
type AceCodeEditorConfig = BlockToolConstructorOptions<
  AceCodeData,
  Partial<AceCodeConfig>
>;
class AceCodeEditorJS implements BlockTool {
  private readonly api: API;
  private readonly readOnly: boolean;
  private readonly nodes: { holder: HTMLDivElement; select: HTMLSelectElement };
  private ace: ace.Ace.Editor | undefined;
  private _data: AceCodeData;
  private readonly config: AceCodeConfig;

  static get isReadOnlySupported(): boolean {
    return true;
  }

  static get enableLineBreaks(): boolean {
    return true;
  }

  constructor(
    config: Pick<Partial<AceCodeEditorConfig>, "data" | "readOnly"> &
      Omit<AceCodeEditorConfig, "data" | "readOnly">
  ) {
    const { data, api, config: toolConfig, readOnly } = config;
    this.api = api;
    this.readOnly = readOnly ? true : false;

    this.config = {
      languages: DEFAULT_LANGUAGES,
      ...toolConfig,
    };

    this._data = {
      code: data?.code || "",
      language: data?.language || "plain",
    };

    this.nodes = this.drawView();
  }

  drawView(): { holder: HTMLDivElement; select: HTMLSelectElement } {
    const wrapper = document.createElement("div");
    const editarea = document.createElement("div");
    editarea.style.marginTop = "10px";

    this.ace = ace.edit(editarea, {
      maxLines: Infinity,
      ...this.config.options,
      readOnly: this.readOnly,
      value: this.data.code,
      mode: this.data.language
        ? this.config.languages[this.data.language]?.mode
        : undefined,
    });

    const select = document.createElement("select");

    for (const key in this.config.languages) {
      if (Object.prototype.hasOwnProperty.call(this.config.languages, key)) {
        const element = this.config.languages[key];

        let option = document.createElement("option");
        option.value = key;
        option.text = element.label;
        select.appendChild(option);
      }
    }

    select.classList.add(this.api.styles.input);

    select.value = this.data.language;

    select.onchange = (ev) => {
      let newVal = (ev.target as HTMLSelectElement).value;
      this._data.language = newVal;
      this.ace?.session.setMode(this.config.languages[newVal]?.mode);
    };

    if (this.readOnly) {
      select.disabled = true;
    }

    wrapper.classList.add(this.api.styles.block);
    wrapper.appendChild(select);
    wrapper.appendChild(editarea);

    return {
      holder: wrapper,
      select: select,
    };
  }

  render() {
    return this.nodes.holder;
  }

  save(_: HTMLDivElement) {
    return {
      code: this.ace?.getValue(),
      language: this.data.language,
    };
  }

  onPaste(event: CustomEvent) {
    const content = event.detail.data;

    this._data.code = content.textContent;
    this.ace?.setValue(content.textContent);
  }

  get data(): AceCodeData {
    return this._data;
  }

  set data(data) {
    this._data = data;

    if (this.ace) {
      this.ace.setValue(data.code);
    }
    if (this.nodes.select) {
      this.nodes.select.value = data.language;
      this.ace?.session.setMode(this.config.languages[data.language]?.mode);
    }
  }

  static get toolbox() {
    return {
      icon: IconBrackets,
      title: "Ace Code",
    };
  }

  static get pasteConfig() {
    return {
      tags: ["pre"],
    };
  }

  static get sanitize() {
    return {
      code: true,
    };
  }
}
export default AceCodeEditorJS;
