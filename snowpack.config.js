/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  devOptions: {
    output: "stream",
    open: "none",
  },
  plugins: ["@snowpack/plugin-react-refresh"],
}
