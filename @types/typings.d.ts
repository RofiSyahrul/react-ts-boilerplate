declare module 'preload-webpack-plugin' {
  import { Compiler } from 'webpack';

  class PreloadWebpackPlugin {
    constructor(options: Record<string, unknown>);
    apply(compiler: Compiler): void;
  }

  export default PreloadWebpackPlugin;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __DEV__: boolean;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    BUILD_ENV: 'local' | 'prod';
    BASE_URL: string;
    BASE_IMAGE_URL: string;
  }
}

declare module '*.eot' {
  const url: string;
  export default url;
}

declare module '*.ttf' {
  const url: string;
  export default url;
}

declare module '*.woff' {
  const url: string;
  export default url;
}

declare module '*.woff2' {
  const url: string;
  export default url;
}
