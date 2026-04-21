#include <WiFi.h>
#include <HTTPClient.h>

// ---------------- WIFI CONFIG ----------------
const char* WIFI_SSID     = "Mk";
const char* WIFI_PASSWORD = "manaskukreja";
const char* SERVER_URL    = "http://10.254.50.151:5000/api/readings";  // ← Your PC's IP

const String DEVICE_ID = "ESP32-001";

// ---------------- PINS ----------------
#define VOLTAGE_PIN 34
#define CURRENT_PIN 35
#define RELAY_PIN   25

// ---------------- VARIABLES ----------------
unsigned long INTERVAL = 5000;     // ms between readings
unsigned long lastTime = 0;

float energy = 0;                  // cumulative kWh

// ---------------- SETUP ----------------
void setup() {
  Serial.begin(115200);

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);   // relay OFF initially

  analogReadResolution(12);       // 12-bit ADC (0–4095)

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected! IP = " + WiFi.localIP().toString());
}

// ---------------- RMS HELPER ----------------
// Reads ~800 samples, removes DC offset, returns RMS ADC count
float readRMS(int pin) {
  const int samples = 800;
  long offset = 0;

  for (int i = 0; i < samples; i++) {
    offset += analogRead(pin);
  }
  offset /= samples;

  long sumSq = 0;
  for (int i = 0; i < samples; i++) {
    long val = analogRead(pin) - offset;
    sumSq += val * val;
  }
  return sqrt((float)sumSq / samples);
}

// ---------------- MAIN LOOP ----------------
void loop() {
  if (millis() - lastTime >= INTERVAL) {
    lastTime = millis();

    // ------- READ SENSORS -------
    float vRMS = readRMS(VOLTAGE_PIN);
    float cRMS = readRMS(CURRENT_PIN);

    // ------- CALIBRATION (tune these factors for your hardware) -------
    float voltage = vRMS * 0.08;    // adjust multiplier to match real voltage
    float current = cRMS * 0.001;   // adjust multiplier to match real current

    float power = voltage * current;

    // Accumulate energy (kWh) for this interval
    energy += power * (INTERVAL / 3600000.0);

    // ------- DEBUG -------
    Serial.println("================================");
    Serial.print("Voltage: "); Serial.print(voltage); Serial.println(" V");
    Serial.print("Current: "); Serial.print(current); Serial.println(" A");
    Serial.print("Power:   "); Serial.print(power);   Serial.println(" W");
    Serial.print("Energy:  "); Serial.print(energy);  Serial.println(" kWh");
    Serial.println("================================");

    // ------- RELAY CONTROL -------
    digitalWrite(RELAY_PIN, (power > 50) ? HIGH : LOW);

    // ------- POST TO DASHBOARD -------
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(SERVER_URL);
      http.addHeader("Content-Type", "application/json");

      // Build JSON payload — field names match backend schema
      String payload = "{";
      payload += "\"deviceId\":\"" + DEVICE_ID + "\",";
      payload += "\"voltage\":"    + String(voltage, 2) + ",";
      payload += "\"current\":"    + String(current, 3) + ",";
      payload += "\"power\":"      + String(power,   2) + ",";
      payload += "\"energy\":"     + String(energy,  4);   // backend accepts 'energy'
      payload += "}";

      int httpCode = http.POST(payload);

      Serial.print("HTTP Response: ");
      Serial.println(httpCode);
      if (httpCode == 201) {
        Serial.println("✓ Reading saved to dashboard!");
      } else if (httpCode < 0) {
        Serial.println("! Connection failed. Check server IP.");
      }

      http.end();
    } else {
      // WiFi dropped — try to reconnect
      Serial.println("WiFi lost, reconnecting...");
      WiFi.disconnect();
      WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    }
  }
}
