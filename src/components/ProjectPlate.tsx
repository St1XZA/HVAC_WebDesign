import type { ReactNode } from 'react';

/**
 * Technical line plates for the field records. Each card gets a diagram that matches
 * the work it describes: a three-floor fit-out, a cold room, a split unit loop,
 * a maintenance estate and a walk-in freezer.
 */

function Plate({ children }: { children: ReactNode }) {
  return (
    <svg
      className="plate"
      viewBox="0 0 320 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** 01 — three floors, one climate */
function SandtonPlate() {
  return (
    <Plate>
      <path d="M62 28h158v140H62z" />
      <path d="M62 75h158M62 122h158" />
      <rect x="118" y="12" width="44" height="16" rx="2" />
      <path d="M130 20h20" />
      <path d="M84 44v112M94 44v112" />
      <path d="M94 64h40M94 106h40M94 148h40" />
      <path d="M146 58h28M146 64h28M146 100h28M146 106h28M146 142h28M146 148h28" />
      <g className="plate__flow">
        <path d="M186 68v14M186 110v14M186 152v8" strokeDasharray="4 6" />
      </g>
      <path d="M208 42h12v16h-12zM208 88h12v16h-12zM208 134h12v16h-12z" opacity=".75" />
      <path d="M44 168h190" opacity=".5" />
    </Plate>
  );
}

/** 02 — midnight cold-chain rescue */
function ColdRoomPlate() {
  return (
    <Plate>
      <path d="M44 42h120v120H44z" />
      <path d="M54 52h100v100H54z" opacity=".55" />
      <path d="M86 98h36v54H86z" />
      <path d="M92 122v6" />
      <path d="M54 82h100" opacity=".45" />
      <g transform="translate(72 68)" className="plate__accent">
        <path d="M0 -9V9M-8 -4.5L8 4.5M-8 4.5L8 -4.5" />
      </g>
      <path d="M34 68v44" opacity=".6" />
      <circle cx="34" cy="120" r="6" />
      <path d="M196 112h76v46h-76z" />
      <circle cx="234" cy="135" r="15" />
      <path d="M234 120v30M219 135h30" opacity=".6" />
      <path d="M196 100v-8M272 100v-8" opacity=".5" />
      <g className="plate__flow">
        <path d="M164 158h32" strokeDasharray="4 6" />
      </g>
      <path d="M196 168h76" opacity=".4" />
    </Plate>
  );
}

/** 03 — restoring rated capacity */
function SplitPlate() {
  return (
    <Plate>
      <path d="M18 46h152" />
      <path d="M18 54h152" opacity=".35" />
      <path d="M44 54h116a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10H44a10 10 0 0 1-10-10V64a10 10 0 0 1 10-10z" />
      <path d="M36 86h132" opacity=".8" />
      <path d="M58 94h90" opacity=".55" />
      <g className="plate__flow">
        <path d="M60 108c0 12 6 20 16 24M100 108c0 14 6 22 16 26M140 108c0 12 6 20 16 24" strokeDasharray="5 7" />
      </g>
      <g className="plate__flow">
        <path d="M152 42c42 6 62 30 64 58" strokeDasharray="5 7" />
        <path d="M156 34c46 6 66 32 68 62" strokeDasharray="5 7" opacity=".45" />
      </g>
      <path d="M196 106h86a6 6 0 0 1 6 6v58a6 6 0 0 1-6 6h-86a6 6 0 0 1-6-6v-58a6 6 0 0 1 6-6z" />
      <circle cx="228" cy="142" r="17" />
      <path d="M228 125v34M211 142h34" opacity=".55" />
      <path d="M216 130l24 24M240 130l-24 24" opacity=".35" />
      <path d="M262 128h16M262 142h16M262 156h16" opacity=".7" />
      <path d="M20 172h146" opacity=".4" />
    </Plate>
  );
}

/** 04 — three years, zero breakdowns */
function ContractPlate() {
  return (
    <Plate>
      <path d="M32 96h52v72H32z" />
      <path d="M92 62h50v106H92z" />
      <path d="M150 110h48v58h-48z" />
      <path d="M44 108h9v9h-9zM64 108h9v9h-9zM44 128h9v9h-9zM64 128h9v9h-9z" opacity=".65" />
      <path d="M104 74h9v9h-9zM124 74h9v9h-9zM104 96h9v9h-9zM124 96h9v9h-9zM104 118h9v9h-9zM124 118h9v9h-9zM104 140h9v9h-9zM124 140h9v9h-9z" opacity=".65" />
      <path d="M162 122h9v9h-9zM180 122h9v9h-9zM162 142h9v9h-9zM180 142h9v9h-9z" opacity=".65" />
      <path d="M24 168h196" opacity=".5" />
      <rect x="216" y="30" width="72" height="80" rx="6" className="plate__accent" />
      <path d="M228 52h18M228 68h18M228 84h18" opacity=".45" />
      <path d="M258 52l3 4 7-8M258 68l3 4 7-8M258 84l3 4 7-8" className="plate__accent" />
      <g className="plate__flow">
        <path d="M222 110v20c0 9 7 16 16 16h40" strokeDasharray="4 6" />
      </g>
      <path d="M216 168h72" opacity=".4" />
    </Plate>
  );
}

/** 05 — a freezer that never slept */
function FreezerPlate() {
  return (
    <Plate>
      <path d="M48 38h150v132H48z" />
      <path d="M58 48h130v112H58z" opacity=".55" />
      <path d="M96 96h42v64H96z" />
      <path d="M130 126v8" />
      <circle cx="74" cy="66" r="10" opacity=".8" />
      <path d="M74 59v14M67 66h14" opacity=".5" />
      <path d="M146 70h32M146 90h32M146 110h32" opacity=".45" />
      <g transform="translate(168 148)" className="plate__accent">
        <path d="M0 -9V9M-8 -4.5L8 4.5M-8 4.5L8 -4.5" />
      </g>
      <g className="plate__flow">
        <path d="M94 56c-16 6-24 18-24 32" strokeDasharray="5 7" />
      </g>
      <circle cx="254" cy="92" r="30" className="plate__accent" />
      <path d="M254 92l-13-17" className="plate__accent" />
      <path d="M254 74v4M272 92h-4M254 110v-4M236 92h4" opacity=".7" />
      <path d="M242 128h24" opacity=".5" />
      <path d="M198 168h76" opacity=".4" />
    </Plate>
  );
}

const plates: Record<string, ReactNode> = {
  'sandton-hq': <SandtonPlate />,
  'cold-room-recovery': <ColdRoomPlate />,
  'randburg-split': <SplitPlate />,
  'midrand-contract': <ContractPlate />,
  'cape-freezer': <FreezerPlate />,
};

export function ProjectPlate({ id }: { id: string }) {
  const plate = plates[id];
  if (!plate) return null;
  return <div className="work__plate">{plate}</div>;
}
