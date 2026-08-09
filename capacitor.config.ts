import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sctechnologie.app',
  appName: 'SC Technologie',
  webDir: 'mobile-dist/client/client',
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
