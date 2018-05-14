#include <OneWire.h>
#include <ESP8266WiFi.h>
#include <DallasTemperature.h>
#include <ESP8266HTTPClient.h>

const int ONE_WIRE_BUS = 0;
const char* SSID = "********";
const char* PASSWORD = "********";

HTTPClient http;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void blink(int mode) {
  if(mode == 0)
  {
    digitalWrite(2, LOW);
    delay(1000);
    digitalWrite(2, HIGH);
    delay(1000);
    digitalWrite(2, LOW);
    delay(1000);
    digitalWrite(2, HIGH);
    delay(1000);
    digitalWrite(2, LOW);
    delay(1000);
    digitalWrite(2, HIGH);
  }
  else if(mode == 1)
  {
    digitalWrite(2, LOW);
    delay(300);
    digitalWrite(2, HIGH);
    delay(300);
    digitalWrite(2, LOW);
    delay(300);
    digitalWrite(2, HIGH);
    delay(300);
    digitalWrite(2, LOW);
    delay(300);
    digitalWrite(2, HIGH);
  }
  else
  {
    digitalWrite(2, LOW);
    delay(3000);
    digitalWrite(2, HIGH);
  }
}

void sendToServer(float value) {
  http.begin("temperature.hungtcs.top", 80, "/api/collection?value=" + String(value) + "&macAddress="+ WiFi.macAddress() + "&ipAddress=" + WiFi.localIP().toString());
  int httpCode = http.GET();
  if(httpCode == HTTP_CODE_OK) {
    Serial.println("send temperature to master success");
    Serial.println(http.getString());
    blink(0);
  } else {
    Serial.printf("send temperature to master faild: %d\n", httpCode);
    Serial.println(http.getString());
    blink(1);
    delay(3000);
    Serial.printf("start retry....");
    sendToServer(value);
  }
  http.end();
}

void connectWiFi(const char *ssid, const char *password) {
  WiFi.begin(ssid, password);
  Serial.printf("\nconnecting to %s\n", SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.printf("\nconnected to %s\n", ssid);
  Serial.print("ip address is: ");
  Serial.println(WiFi.localIP());
}

void setup(void) {
  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);

  Serial.begin(115200);
  sensors.begin();

  WiFi.mode(WIFI_STA);
  connectWiFi(SSID, PASSWORD);
}

void loop(void){
  while (WiFi.status() == WL_CONNECT_FAILED || WiFi.status() == WL_CONNECTION_LOST || WiFi.status() == WL_DISCONNECTED) {
    Serial.printf("reconnect to %s\n", SSID);
    connectWiFi(SSID, PASSWORD);
  }

  sensors.requestTemperatures();
  float temperature = sensors.getTempCByIndex(0);

  Serial.printf("temperature is %f\n", temperature);
  sendToServer(temperature);
  delay(60000);
}
