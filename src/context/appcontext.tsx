"use client"
import React, { useState, createContext, useEffect, use } from 'react';
import type { FC, ReactNode } from 'react';

export const ConnectionStatusContext = createContext<{
  messages?: any;
  setMessages?: any;
  userData?: any;
  setUserData?: any;
}>({
});

export interface UserData {
  name: string,
  email: string,
}

export const ConnectionStatusProvider: FC<{ children: NonNullable<ReactNode> }> = ({ children }) => {

  const [messages, setMessages] = useState([])
  const [userData, setUserData] = useState<UserData>()

  const value = {
    messages: messages,
    setMessages: setMessages,
    userData: userData,
    setUserData: setUserData
  };

  return <ConnectionStatusContext.Provider value={value}>{children}</ConnectionStatusContext.Provider>;
};