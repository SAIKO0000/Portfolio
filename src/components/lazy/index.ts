// Lazy loading components configuration
// Components will be added here as they are implemented

import dynamic from 'next/dynamic';

export const LazyMCPDemo = dynamic(() => import('../MCPDemo'));

export const LazyComponents = {
  // Future lazy loaded components will be exported from here
  // This prevents import errors while components are being developed
};
