import { createContext } from "react";
import socketIO from 'socket.io-client';

const socket = socketIO.io();
export const SocketContext = createContext(socket);