import { Sandpack, SandpackFiles } from "@codesandbox/sandpack-react";

export const Sandbox = (files: SandpackFiles) => {
  return (
    <Sandpack
      files={files}
      theme={{
        colors: {
          surface1: "#eae8e8",
          surface2: "#00997761",
          surface3: "#ffffff5e",
          clickable: "#421010",
          base: "#421010",
          disabled: "#C5C5C5",
          hover: "#4D4D4D",
          accent: "#009977",
          error: "#ff453a",
          errorSurface: "#e8cac6",
        },
        syntax: {
          plain: "#151515",
          comment: {
            color: "#a9a7a7",
            fontStyle: "italic",
          },
          keyword: "#0971F1",
          tag: "#097104",
          punctuation: "#3B3B3B",
          definition: "#042d60",
          property: "#9013fe",
          static: "#FF453A",
          string: "#f5a623",
        },
        font: {
          body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
          size: "13px",
          lineHeight: "20px",
        },
      }}
      template="nextjs"
    />
  );
};
