import * as React from "react";
const SVGComponent = (props: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m7.777 12.001 15.689-3.776V.013H15.33L7.777 12.001ZM0 11.857c0 .982.119 1.936.343 2.85L7.776 12 .28 9.271A12.053 12.053 0 0 0 0 11.855v.002Z"
      fill="#F30"
    />
    <path
      d="m2.764 4.222 5.01 7.78L10.083.13a11.68 11.68 0 0 0-7.319 4.091Zm5.013 7.779 15.689 3.775v8.211H15.33L7.777 12.001Z"
      fill="#F30"
    />
    <path
      d="m2.765 19.778 5.009-7.78 2.307 11.869a11.68 11.68 0 0 1-7.319-4.091l.003.002Z"
      fill="#F30"
    />
  </svg>
);
export default SVGComponent;
