'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import createEmotionCache from '@/utiles/emotionCache';

const emotionCache = createEmotionCache();

export default function MuiClientProvider({ children }) {
  return (
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      {children}
    </CacheProvider>
  );
}
