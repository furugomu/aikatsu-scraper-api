const presets = ["@babel/preset-typescript"];
const plugins = ["@babel/plugin-transform-modules-commonjs"];

if (process.env.NODE_ENV === "test") {
  presets.push("power-assert");
}

if (process.env.NODE_ENV === "production") {
  // presets.push("@babel/preset-env");
}

module.exports = {
  presets,
  plugins
};
