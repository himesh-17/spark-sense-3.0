#include <WiFi.h>
#include <HTTPClient.h>

// ----------------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------------
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// Your backend server IP and port (e.g., http://192.168.1.100:5000/api/readings)
const String SERVER_URL   = "http://YOUR_SERVER_IP:5000/api/readings";

// Device identifier
const String DEVICE_ID    = "ESP32-001";

// Reading interval in milliseconds
const unsigned long INTERVAL = 5000;
unsigned long lastReadingTime = 0;

// ----------------------------------------------------------------------------
// SETUP
// ----------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  delay(10);
  
  // Connect to WiFi
  Serial.println("\nConnecting to WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

// ----------------------------------------------------------------------------
// MAIN LOOP
// ----------------------------------------------------------------------------
void loop() {
  unsigned long currentMillis = millis();
  
  // Send data strictly at the required interval
  if (currentMillis - lastReadingTime >= INTERVAL) {
    lastReadingTime = currentMillis;
    
    // 1. Read sensor data (Replace with actual sensor code like INA219 or PZEM)
    // Here we generate simulated values around expected baselines.
    float voltage = random(2200, 2400) / 10.0;   // 220.0 to 240.0 V
    float current = random(10, 50) / 10.0;       // 1.0 to 5.0 A
    float power = voltage * current;             // Watts
    float energy = power * (INTERVAL / 3600000.0); // Simple energy diff integration
    float pf = random(85, 99) / 100.0;           // Power factor 0.85 to 0.99
    
    // 2. Prepare JSON payload
    String payload = "{";
    payload += "\"deviceId\":\"" + DEVICE_ID + "\",";
    payload += "\"voltage\":" + String(voltage, 2) + ",";
    payload += "\"current\":" + String(current, 2) + ",";
    payload += "\"power\":" + String(power, 2) + ",";
    payload += "\"energy\":" + String(energy, 4) + ",";
    payload += "\"powerFactor\":" + String(pf, 2);
    payload += "}";
    
    // 3. Send HTTP POST request
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(SERVER_URL);
      http.addHeader("Content-Type", "application/json");
      
      Serial.println("Sending: " + payload);
      int httpResponseCode = http.POST(payload);
      
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String response = http.getString();
        Serial.println("Server Response: " + response);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      
      http.end();
    } else {
      Serial.println("WiFi Disconnected. Attempting to reconnect...");
      WiFi.disconnect();
      WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    }
  }
}
