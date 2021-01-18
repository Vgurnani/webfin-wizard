const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const Dotenv = require("dotenv-webpack");
const path = require('path');
module.exports = withCSS(withSass({
   webpack (config, options) {
       config.module.rules.push({
           test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
           use: {
               loader: 'url-loader',
               options: {
                   limit: 100000
               }
           }
       });
       config.resolve.alias["@"] = path.resolve(__dirname); 
       config.plugins.push(new Dotenv({ silent: true }));
       return config;
   }
}));