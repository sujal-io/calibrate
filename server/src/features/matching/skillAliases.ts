export const SKILL_ALIASES: Record<string, string> = {
  // React
  react: "react",
  "react.js": "react",
  reactjs: "react",

  // JavaScript
  javascript: "javascript",
  js: "javascript",
  "javascript (es6+)": "javascript",

  // Node
  node: "nodejs",
  "node.js": "nodejs",
  nodejs: "nodejs",

  // Express
  express: "express",
  expressjs: "express",
  "express.js": "express",

  // HTML
  html: "html",
  html5: "html",

  // CSS
  css: "css",
  css3: "css",

  // Mongo
  mongo: "mongodb",
  mongodb: "mongodb",

  // REST
  "rest api": "rest api",
  "rest apis": "rest api",
  "restful api": "rest api",
  "restful apis": "rest api",

  // Tailwind
  tailwind: "tailwind css",
  "tailwind css": "tailwind css",

  // Socket
  socketio: "socket.io",
  "socket.io": "socket.io",

  // Next
  next: "next.js",
  nextjs: "next.js",
  "next.js": "next.js",
};

export const normalizeSkill = (skill: string) => {
  const normalized = skill.trim().toLowerCase();

  return SKILL_ALIASES[normalized] ?? normalized;
};