import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sctechnologie.app',
  appName: 'SC Technologie',
  webDir: 'mobile-dist/client/client',
  server: {
    iosScheme: 'https'
  },
  ios: {
    backgroundColor: '#ffffff',
    contentInset: 'always',
    limitsNavigationsToAppBoundDomains: false
  }
};

export default config;
