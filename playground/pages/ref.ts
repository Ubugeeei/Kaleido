import KaleidoDOM from "~/src/core/dom";
import { useRef } from "~/src/core/hooks";

const RefSample = () => {
  const inputEl = useRef<HTMLInputElement | null>(null);
  const focusInput = () => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }

  const textAreaEl = useRef<HTMLTextAreaElement | null>(null);
  const focusTextArea = () => {
    if (textAreaEl.current) {
      textAreaEl.current.focus();
    }
  }




  return KaleidoDOM.createElement(
    "div",
    { id: "pages-counter", key: "pages-counter" },
    [
      KaleidoDOM.createElement(
        "div",
        { style: "margin-bottom: 24px" },
        [
          KaleidoDOM.createElement('textarea', { ref: textAreaEl, style: "margin-right: 12px" }, []),
          KaleidoDOM.createElement('button', { onClick: focusTextArea }, ['focus textarea']),
        ]
      ),
      KaleidoDOM.createElement(
        "div",
        {},
        [
          KaleidoDOM.createElement('input', { ref: inputEl, style: "margin-right: 12px" }, []),
          KaleidoDOM.createElement('button', { onClick: focusInput }, ['focus input']),
        ]
      ),
    ]
  );
};

export default RefSample;
