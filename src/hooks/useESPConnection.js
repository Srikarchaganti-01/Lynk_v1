import { useState } from "react";

export default function useESPConnection() {
  const [status, setStatus] = useState("Connected");

  return {
    status,
  };
}
