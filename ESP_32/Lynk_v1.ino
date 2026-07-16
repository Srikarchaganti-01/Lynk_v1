#include <WiFi.h>
#include <WebServer.h>

#define GREEN_LED 25
#define BLUE_LED 26
#define RED_LED 27
#define WHITE_LED 32
#define YELLOW_LED 33
#define BUZZER 14
#define DOT_BTN   12
#define DASH_BTN  13
#define MODE_BTN  4
String morseBuffer = "";
String receivedMessage = "";
bool newMessageReady = false;
unsigned long modePressTime = 0;
bool modePressed = false;
bool lastDot = HIGH;
bool lastDash = HIGH;
bool lastMode = HIGH;
String pendingMessage = "";
int currentIndex = 0;
bool isTransmitting = false;
unsigned long lastTransmissionTime = 0;
const int transmissionDelay = 1000;


const char* ssid = "Srikar";
const char* password = "SRIKAR123";

WebServer server(80);

struct TransmissionState {
  String status;
  String message;
  char currentChar;
  String currentMorse;
  int progress;
};


TransmissionState transmission = {
  "Connected",
  "",
  '-',
  "",
  0
};

String morseTable[36] = {
  ".-", "-...", "-.-.", "-..", ".", "..-.", "--.",
  "....", "..", ".---", "-.-", ".-..", "--",
  "-.", "---", ".--.", "--.-", ".-.", "...",
  "-", "..-", "...-", ".--", "-..-", "-.--",
  "--..",
  "-----", ".----", "..---", "...--", "....-",
  ".....", "-....", "--...", "---..", "----."
};
char chars[36] = {
  'A','B','C','D','E','F','G','H','I','J',
  'K','L','M','N','O','P','Q','R','S','T',
  'U','V','W','X','Y','Z',
  '0','1','2','3','4','5','6','7','8','9'
};

String getMorse(char c) {

  c = toupper(c);
  for(int i = 0; i < 36; i++) {
    if(chars[i] == c) {
      return morseTable[i];
    }
  }
  return "";
}

void dotSignal(){
  digitalWrite(YELLOW_LED,HIGH);
  ledcWriteTone(BUZZER,2000);
  delay(200);
  ledcWriteTone(BUZZER,0);
  digitalWrite(YELLOW_LED,LOW);
  delay(200);
}

void dashSignal(){
  digitalWrite(YELLOW_LED,HIGH);
  ledcWriteTone(BUZZER,2000);
  delay(600);
  ledcWriteTone(BUZZER,0);
  digitalWrite(YELLOW_LED,LOW);
  delay(200);
}

void spaceSignal(){
  digitalWrite(WHITE_LED,HIGH);
  delay(700);
  digitalWrite(WHITE_LED,LOW);
}

void receiveDotSignal(){
  digitalWrite(YELLOW_LED,HIGH);
  ledcWriteTone(BUZZER,2000);
  delay(200);
  ledcWriteTone(BUZZER,0);
  digitalWrite(YELLOW_LED,LOW);
}

void receiveDashSignal(){
  digitalWrite(YELLOW_LED,HIGH);
  ledcWriteTone(BUZZER,2000);
  delay(600);
  ledcWriteTone(BUZZER,0);
  digitalWrite(YELLOW_LED,LOW);
}

void transmitNextStep() {
  digitalWrite(GREEN_LED, HIGH);
  if(currentIndex >= pendingMessage.length()) {
    Serial.println("#END#");
    transmission.status = "Connected";
    transmission.currentChar = '-';
    transmission.currentMorse = "";
    transmission.progress = 0;
    isTransmitting = false;
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, HIGH);
    delay(500);
    digitalWrite(RED_LED, LOW);
    return;
  }
  char c = pendingMessage[currentIndex];
  if(c == ' ') {
    Serial.println("/");
    spaceSignal();
    transmission.currentChar = ' ';
    transmission.currentMorse = "/";
  }
  else {
    String morse = getMorse(c);
    for(int i=0;i<morse.length();i++){
      if(morse[i]=='.'){dotSignal();}
      else if(morse[i]=='-'){dashSignal();}
    }
    transmission.status = "Transmitting";
    transmission.message = pendingMessage;
    transmission.currentChar = c;
    transmission.currentMorse = morse;
    transmission.progress = ((currentIndex + 1) * 100) / pendingMessage.length();

    Serial.print(c);
    Serial.print(" : ");
    Serial.println(morse);
    delay(1000);
  }
  currentIndex++;
}

void handleRoot() {
  server.sendHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  server.send(
    200,
    "text/plain",
    "Lynk ESP32 is online"
  );
}
void handleSend() {
  if(server.hasArg("message")) {
    pendingMessage = server.arg("message");
    currentIndex = 0;
    isTransmitting = true;
    transmission.status = "Transmitting";
    transmission.message = pendingMessage;
    transmission.progress = 0;
    Serial.println("New Transmission:");
    Serial.println(pendingMessage);
    server.sendHeader(
      "Access-Control-Allow-Origin",
      "*"
    );
    server.send(
      200,
      "text/plain",
      "Message received"
    );
  }
  else {
    server.sendHeader(
      "Access-Control-Allow-Origin",
      "*"
    );
    server.send(
      400,
      "text/plain",
      "No message received"
    );
  }
}

void handleReceived() {
  String json = "{";
  json += "\"message\":\"";
  json += receivedMessage;
  json += "\",";
  json += "\"status\":\"Receiving\",";
  json += "\"ready\":";
  json += newMessageReady ? "true" : "false";
  json += "}";
  server.sendHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  server.send(
    200,
    "application/json",
    json
  );
  // reset after sending to React
  if(newMessageReady){
    receivedMessage = "";
    newMessageReady = false;

  }
}

void handleTransmission() {
  String json = "{";
  json += "\"status\":\"" + transmission.status + "\",";
  json += "\"message\":\"" + transmission.message + "\",";
  json += "\"currentChar\":\"";
  json += transmission.currentChar;
  json += "\",";
  json += "\"currentMorse\":\"" + transmission.currentMorse + "\",";
  json += "\"progress\":";
  json += transmission.progress;
  json += "}";

  server.sendHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  server.send(
    200,
    "application/json",
    json
  );
}
char decodeMorse(String morse) {
  for (int i = 0; i < 36; i++) {
    if (morseTable[i] == morse) {
      return chars[i];
    }
  }
  return '?';
}

void setup() {

  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(WHITE_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(DOT_BTN, INPUT_PULLUP);
  pinMode(DASH_BTN, INPUT_PULLUP);
  pinMode(MODE_BTN, INPUT_PULLUP);

  ledcAttach(BUZZER, 2000, 8); 
  Serial.begin(115200);
  WiFi.begin(ssid,password);
  Serial.print("Connecting");
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("WiFi Connected");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());

  server.on("/",handleRoot);
  
  server.on(
    "/send",
    HTTP_GET,
    handleSend
  );

  server.on(
    "/transmission",
    HTTP_GET,
    handleTransmission
  );

  server.on(
    "/received", 
    HTTP_GET, 
    handleReceived
  );

  server.begin();
  Serial.println("Server Started");
}

void loop() {
  server.handleClient();

  bool dot = digitalRead(DOT_BTN);
  bool dash = digitalRead(DASH_BTN);
  bool mode = digitalRead(MODE_BTN);

  if (lastDot == HIGH && dot == LOW) {
    morseBuffer += ".";
    digitalWrite(BLUE_LED,HIGH);
    receiveDotSignal();
    Serial.print("Buffer : ");
    Serial.println(morseBuffer);
  }

  if (lastDash == HIGH && dash == LOW) {

    morseBuffer += "-";
    digitalWrite(BLUE_LED,HIGH);
    receiveDashSignal();
    Serial.print("Buffer : ");
    Serial.println(morseBuffer);
  }
  // MODE button pressed
  if (lastMode == HIGH && mode == LOW) {

    modePressTime = millis();
    modePressed = true;

  }

// MODE button released
  if (lastMode == LOW && mode == HIGH) {
    unsigned long pressDuration = millis() - modePressTime;
    // Long press = message complete
    if (pressDuration > 1000) {
      newMessageReady = true;
      digitalWrite(BLUE_LED,LOW);
      digitalWrite(RED_LED,HIGH);
      delay(500);
      digitalWrite(RED_LED,LOW);

      Serial.println("MESSAGE COMPLETE");
      Serial.println(receivedMessage);
      morseBuffer = "";

    }
    // Short press = decode character
    else {
      if(morseBuffer.length() > 0) {
        char decoded = decodeMorse(morseBuffer);
        receivedMessage += decoded;
        Serial.print("Character: ");
        Serial.println(decoded);
        Serial.print("Message: ");
        Serial.println(receivedMessage);
        morseBuffer = "";
      }
    }
    modePressed = false;
  }

  lastDot = dot;
  lastDash = dash;
  lastMode = mode;

  if(isTransmitting) {
    if(millis() - lastTransmissionTime >= transmissionDelay) {
      lastTransmissionTime = millis();
      transmitNextStep();
    }
  }
}
