// Type definitions for VSCode webview API
interface VSCodeAPI {
  postMessage(message: any): void;
  getState(): any;
  setState(state: any): void;
}

declare function acquireVsCodeApi(): VSCodeAPI;

declare global {
  interface Window {
    electron?: {
      pathExists?: (path: string) => Promise<boolean>;
      selectDirectory?: () => Promise<string | null>;
    };
  }
}
