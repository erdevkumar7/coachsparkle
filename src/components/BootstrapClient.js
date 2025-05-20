'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // Dynamically import Bootstrap JS only on client
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null; // this component doesn't render anything
}
