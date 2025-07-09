import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import type { Suggestion } from "../types/suggestion";

let connection: HubConnection | null = null;

export const connectSuggestionSocket = async (
  email: string,
  onReceive: (s: Suggestion) => void
) => {
  if (connection) return;

  connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5209/hubs/suggestions")
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("ReceiveSuggestion", onReceive);

  try {
    await connection.start();
    console.log("Connected to SignalR");
    await connection.invoke("SubscribeToSuggestions", email);
  } catch (err) {
    console.error("SignalR connection error:", err);
  }
};

export const disconnectSuggestionSocket = async () => {
  if (connection) {
    await connection.stop();
    connection = null;
    console.log("Disconnected from SignalR");
  }
};
