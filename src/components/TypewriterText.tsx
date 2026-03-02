// import { useState, useEffect } from "react";

// const roles = [
//   "a UI/UX Designer",
//   "a Software Developer",
//   "a Cybersecurity Enthusiast",
//   "an Avid Researcher",
// ];

// const DURATION = 2.5;
// const PAUSE = 1000;

// const SmoothTypewriter = () => {
//   const [roleIndex, setRoleIndex] = useState(0);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setRoleIndex((prev) => (prev + 1) % roles.length);
//     }, DURATION * 1000 + PAUSE);

//     return () => clearTimeout(timeout);
//   }, [roleIndex]);

//   return (
//     <span className="inline-flex whitespace-nowrap font-mono items-end">
//       <span
//         key={roleIndex}
//         className="inline-block animate-reveal overflow-hidden"
//       >
//         {roles[roleIndex]}
//       </span>

//       <span className="inline-block w-[2px] h-[1em] bg-foreground ml-1" />
//     </span>
//   );
// };

// export default SmoothTypewriter;

import { useState, useEffect } from "react";

const roles = [
  "a UI/UX Designer",
  "a Software Developer",
  "a Cybersecurity Enthusiast",
  "an Avid Researcher",
];

const DURATION = 1.2; // match tailwind animation time
const PAUSE = 1000;

const SmoothTypewriter = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"expand" | "collapse">("expand");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "expand") {
      timeout = setTimeout(() => {
        timeout = setTimeout(() => setPhase("collapse"), PAUSE);
      }, DURATION * 1000);
    } else {
      timeout = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setPhase("expand");
      }, DURATION * 1000);
    }

    return () => clearTimeout(timeout);
  }, [phase, roleIndex]);

  return (
    <span className="inline-flex whitespace-nowrap font-mono items-end">
      <span
        className={`inline-block overflow-hidden ${
          phase === "expand" ? "animate-reveal" : "animate-collapse"
        }`}
      >
        {roles[roleIndex]}
      </span>

      <span className="inline-block w-[2px] h-[1em] bg-foreground ml-1" />
    </span>
  );
};

export default SmoothTypewriter;