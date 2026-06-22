import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sctechnologie.app',
  appName: 'SC Technologie',
  webDir: 'mobile-dist/client',
  server: {
    iosScheme: 'capacitor'
  },
  ios: {
    backgroundColor: '#ffffff',
    contentInset: 'always',
    limitsNavigationsToAppBoundDomains: true
  }
};

export default config;
