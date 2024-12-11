import { HomeButtons } from "./HomeButtons";
import { JogButtons } from "./JogButtons";

export const JogRose = ({ onCommand }) => {
  return (
    <svg width="256" height="260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`
            text.scl { stroke: #fff; fill: #fff; pointer-events: none; }
            path.std { stroke: #000; stroke-width: 1; filter: url(#f1); cursor: pointer; }
            path.std:hover { fill: orange; }
          `}
        </style>
        <filter id="f1" x="-1" y="-1" width="300%" height="300%">
          <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <symbol id="HomeIcon" viewBox="0 0 20 18" pointerEvents="none">
          <path className="home" d="M3,18 v-8 l7,-6 l7,6 v8 h-5 v-6 h-4 v6 z" fill="black" />
          <path className="home" d="M0,10 l10-8.5 l10,8.5" strokeWidth="1.5" fill="none" />
          <path className="home" d="M15,3 v2.8 l1,.8 v-3.6 z" />
        </symbol>
      </defs>
      <HomeButtons onCommand={onCommand} />
      <JogButtons onCommand={onCommand} />
    </svg>
  );
};
