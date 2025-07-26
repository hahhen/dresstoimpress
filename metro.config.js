const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

const defaultSourceExts = config.resolver.sourceExts;
const defaultAssetExts = config.resolver.assetExts;

config.resolver = {
    ...config.resolver,
    sourceExts: [...defaultSourceExts, 'cjs', 'mjs'],
    assetExts: [...defaultAssetExts, 'glb', 'gltf'],
};

module.exports = withNativeWind(config, { input: './global.css' });
