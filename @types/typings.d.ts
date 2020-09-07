declare module 'preload-webpack-plugin' {
  import { Compiler } from 'webpack';

  class PreloadWebpackPlugin {
    constructor(options: Record<string, unknown>);
    apply(compiler: Compiler): void;
  }

  export default PreloadWebpackPlugin;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    BUILD_ENV: string;
    BASE_URL: string;
    API_KEY: string;
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
