// src/lord-icon.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'lord-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      trigger?: string;
      delay?: string | number;
      colors?: string;
      style?: React.CSSProperties;
    };
  }
}
