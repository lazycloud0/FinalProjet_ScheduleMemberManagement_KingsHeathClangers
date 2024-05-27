import * as React from "react";
const ShoppingCart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Livello_1"
    data-name="Livello 1"
    viewBox="0 0 66 67"
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-2{fill:none;stroke:#e1682d;stroke-linejoin:round;stroke-width:2px;stroke-linecap:round}.cls-3{fill:#e1682d}"
        }
      </style>
    </defs>
    <title />
    <path d="M1 35A32 32 0 1 0 33 3 32 32 0 0 0 1 35Z" />
    <g id="Shopping_Cart" data-name="Shopping Cart">
      <path
        d="M26.79 37.26h18.84a1.56 1.56 0 0 0 1.53-1.17L50 24.62a1.16 1.16 0 0 0-1.25-1.05h-27"
        style={{
          fill: "none",
          stroke: "#e1682d",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
      <path d="M20.19 19h-4.71M46.86 43.35H28.03L20.19 19" className="cls-2" />
      <ellipse cx={31.17} cy={50.96} className="cls-3" rx={3.14} ry={3.04} />
      <ellipse cx={43.72} cy={50.96} className="cls-3" rx={3.14} ry={3.04} />
    </g>
  </svg>
);
export default ShoppingCart;
