export const mockConnection = {
  // Connected, Disconnected ,Transmitting,Receiving
  status: "Receiving",
};

export const mockTransmission = {
  status: "Receiving",
  message: "HELLO WORLD",
  currentChar: "A",
  currentMorse: ".-",
  progress: 33.33,
};

export const mockAnalytics = {
  sentMessages: 24,
  receivedMessages: 18,
  totalCharacters: 312,
};

export const mockHistory = [
  {
    id: 1,
    type: "sent",
    message: "HELLO",
  },
  {
    id: 2,
    type: "received",
    message: "WELCOME",
  },
  {
    id: 3,
    type: "sent",
    message: "HOW ARE YOU?",
  },
  {
    id: 4,
    type: "received",
    message: "I AM FINE",
  },
];
