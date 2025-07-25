'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function ActionButton({
  children,
  navigateTo,       // route string
  onClickAction,     // optional custom function
  className = '',
  disabled = false,
  ...rest
}) {
  const router = useRouter();

  const handleClick = () => {
    if (onClickAction) {
      onClickAction(); // Custom logic if passed
    } else if (navigateTo) {
      router.push(navigateTo); // Navigate
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
