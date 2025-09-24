'use client'

import React from 'react';

interface GlobalErrorProps {
  error: Error;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error }) => {
  return (
    <html>
      <body>
        Opppps!
      </body>
    </html>
  );
};

export default GlobalError;