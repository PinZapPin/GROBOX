/**
 * Centralized Asset Paths
 * Generate asset URLs dengan BASE_URL untuk kompatibilitas GitHub Pages
 */

const baseUrl = import.meta.env.BASE_URL;

// Helper untuk generate asset path
const getAssetUrl = (path: string) => `${baseUrl}assets/${path}`;

export const images = {
  frame: {
    tempIcon: getAssetUrl('frame/tempIcon.png'),
    windIcon: getAssetUrl('frame/windIcon.png'),
    lightIcon: getAssetUrl('frame/lightIcon.png'),
    humidityIcon: getAssetUrl('frame/humidityIcon.png'),
    soilmoistureIcon: getAssetUrl('frame/soilmoistureIcon.png'),
    watercapIcon: getAssetUrl('frame/watercapIcon.png'),
    fanIcon: getAssetUrl('frame/fanIcon.png'),
    pumpIcon: getAssetUrl('frame/pumpIcon.png'),
    vpdIcon: getAssetUrl('frame/vpdIcon.png'),
    logo: getAssetUrl('frame/logo.png'),
    plant: getAssetUrl('frame/plant.png'),
  },
  sidebar: {
    dashboardIcon: getAssetUrl('sidebar/dashboardIcon.png'),
    controlIcon: getAssetUrl('sidebar/controlIcon.png'),
    aboutIcon: getAssetUrl('sidebar/aboutIcon.png'),
  },
  background: getAssetUrl('background.png'),
  geminiIcon: getAssetUrl('gemini-color.png'),
  pumpImage: getAssetUrl('pump.jpg'),
};

export default images;
