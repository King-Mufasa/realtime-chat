"use client"
import type { FC, ReactNode } from 'react';
import React from 'react';
import { ConnectionStatusProvider } from './appcontext';

export const AppContext: FC<{ children: NonNullable<ReactNode> }> = ({ children }) => {
  return (
      <ConnectionStatusProvider>{children}</ConnectionStatusProvider>
  );
};