module.exports = {
  plugins: ["@furugomu"],
  extends: ["plugin:@furugomu/recommended", "plugin:@furugomu/+ts"],
  env: { jest: true, node: true }
};
