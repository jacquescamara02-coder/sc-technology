import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sctechnologie.app',
  appName: 'SC Technologie',
  webDir: 'mobile-dist/client/client',
  server: {
    url: 'https://sc-technologie.shop',
    cleartext: false,
    iosScheme: 'https',
    allowNavigation: ['sc-technologie.shop', '*.sc-technologie.shop']
  },
  plugins: {
    Keyboard: {
      resize: 'body'
    }
  },
  ios: {
    backgroundColor: '#16213f',
    contentInset: 'always',
    limitsNavigationsToAppBoundDomains: false
  }
};

export default config;
