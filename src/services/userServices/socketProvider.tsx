import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import io from "socket.io-client";

// Define the context type
interface SocketContextType {
  socket: ReturnType<typeof io> | null; // Use ReturnType to get the type of socket from io
}

// Create the socket context with proper typing
const socketContext = createContext<SocketContextType | undefined>(undefined);

// Define the props for the SocketProvider component
interface SocketProviderProps {
  children: ReactNode;
}

function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null); // Properly typing the socket state

  useEffect(() => {
    if (!socket) {
      const newSocket = io(import.meta.env.VITE_CHAT_SOCKET_URL as string); // Call the io function directly
      newSocket.on("connect", () => {
        console.log(`Socket connected: ${newSocket.id}`);
        setSocket(newSocket);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [socket]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
}

export default SocketProvider;

export const useSocket = () => {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
