const ESP_IP = "10.22.228.241";

export async function checkESPConnection() {
  try {
    const response = await fetch(`http://${ESP_IP}/`);

    return response.ok;
  } catch (error) {
    console.log("ESP connection failed");
    return false;
  }
}

export async function getTransmission() {
  try {
    const response = await fetch(`http://${ESP_IP}/transmission`);

    if (!response.ok) {
      throw new Error("Failed");
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getReceived() {
  try {
    const response = await fetch(`http://${ESP_IP}/received`);

    return await response.json();
  } catch (error) {
    console.log("Receiving failed");
    return null;
  }
}

export async function sendMessage(message) {
  try {
    const response = await fetch(
      `http://${ESP_IP}/send?message=${encodeURIComponent(message)}`,
    );

    const data = await response.text();

    console.log(data);
  } catch (error) {
    console.log("Message sending failed");
  }
}
