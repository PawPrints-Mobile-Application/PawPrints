import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pawprints',
  appName: 'pawprints',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
