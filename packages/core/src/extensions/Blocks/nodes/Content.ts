import { mergeAttributes, Node } from "@tiptap/core";
import styles from "./Block.module.css";
export interface IBlock {
  HTMLAttributes: Record<string, any>;
}

export const ContentBlock = Node.create<IBlock>({
  name: "content",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      listType: {
        default: undefined,
        renderHTML: (attributes) => {
          return {
            "data-listType": attributes.listType,
          };
        },
        parseHTML: (element) => element.getAttribute("data-listType"),
      },
      position: {
        default: undefined,
        renderHTML: (attributes) => {
          return {
            "data-position": attributes.position,
          };
        },
        parseHTML: (element) => element.getAttribute("data-position"),
      },
    };
  },

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "div",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    if (HTMLAttributes["data-listType"] === "check") {
      return [
        "div",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: styles.blockContent,
        }),
        [
          "input",
          {
            type: "checkbox",
            contenteditable: "false",
            checked: node.attrs.checked ? "checked" : null,
            class: styles.blockCheck,
          },
        ],
        ["div", 0],
      ];
    }
    // TODO: The extra nested div is only needed for placeholders, different solution (without extra div) would be preferable
    // We can't use the other div because the ::before attribute on that one is already reserved for list-bullets
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: styles.blockContent,
      }),
      ["div", 0],
    ];
  },
});
