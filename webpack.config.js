const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./dist/main.js", // Archivo principal dentro de la carpeta dist
  target: "node", // Para aplicaciones Node.js
  externals: [nodeExternals()], // Excluye node_modules del bundle
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "source-map", // Habilita source maps
  output: {
    path: path.resolve(__dirname, ".webpack"), // Carpeta de salida
    filename: "index.js" // Archivo generado en la carpeta dist
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "dist", to: "dist" }, // Copia el directorio dist al directorio de salida
        { from: ".env", to: "." } // Copia el archivo .env al directorio de salida
      ]
    })
  ]
};