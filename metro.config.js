const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { resolver } = config;
const { assetExts, sourceExts } = resolver;

config.resolver.assetExts = [...assetExts, 'svg'];
config.resolver.sourceExts = sourceExts.filter(ext => ext !== 'svg');

module.exports = config;
