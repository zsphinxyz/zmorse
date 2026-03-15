import 'react';

declare module 'react' {
  interface CSSProperties {
    '--steps'?: string;
    [key: `--${string}`]: string | number | undefined;
  }
}
