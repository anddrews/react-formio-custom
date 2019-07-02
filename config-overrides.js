const path = require('path');
const paths = require('react-scripts/config/paths');
const publicPath = paths.servedPath;
const HtmlWebpackPlugin = require('html-webpack-plugin');


paths.formiojs = paths.appSrc + '/formio/index.js';
paths.appHtml = paths.appPublic + '/index.html';
paths.appIndexJs = paths.appSrc + '/index.js';

paths.appAdminJs = paths.appSrc + '/admin.js';

const replacePlugin = (plugins, nameMatcher, newPlugin) => {
  const pluginIndex = plugins.findIndex((plugin) => {
    return plugin.constructor && plugin.constructor.name && nameMatcher(plugin.constructor.name);
  });
  
  if (pluginIndex === -1)
    return plugins;
  
  const nextPlugins = plugins.slice(0, pluginIndex).concat(newPlugin).concat(plugins.slice(pluginIndex + 1));
  
  return nextPlugins;
};

module.exports = function override(config, env) {
  const portal = process.env.REACT_APP_PORTAL || 'member';
  
  config.entry = {
    index: [
      // require.resolve('react-scripts/config/polyfills'),
      paths.appIndexJs,
    ],
    formio: [
      // require.resolve('react-scripts/config/polyfills'),
      paths.formiojs,
    ]
  };
  
  config.output = {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath),
  };
  
  const htmlTemplates = {
    member: paths.appHtml,
  };
  
  const htmlPluginConfig = new HtmlWebpackPlugin({
    inject: true,
    chunks: [portal],
    template: htmlTemplates[portal],
  });
  
  // config.plugins = replacePlugin(config.plugins, (name) => /HtmlWebpackPlugin/i.test(name), htmlPluginConfig);
  
  
  config.optimization = {
    splitChunks: {
      chunks: 'all'
    }
  };
  
  return config;
};

