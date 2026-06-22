// Quick test script to verify auth endpoints
// Run with: node test-auth.js

const http = require("http");

const BASE_URL = process.env.BACKEND_URL || "http://localhost:3000";

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({
          status: res.statusCode,
          body: JSON.parse(data),
        });
      });
    });

    req.on("error", reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("🧪 Starting Auth Endpoint Tests...\n");

  try {
    // Test 1: Register
    console.log("1️⃣  Testing Register Endpoint...");
    const testEmail = `test${Date.now()}@example.com`;
    const registerRes = await makeRequest("POST", "/api/auth/register", {
      firstName: "Test",
      lastName: "User",
      email: testEmail,
      password: "TestPass123",
    });
    console.log(`Status: ${registerRes.status}`);
    console.log(`Message: ${registerRes.body.message}`);
    const token = registerRes.body.token;
    console.log(`Token: ${token ? "✅ Received" : "❌ Missing"}\n`);

    // Test 2: Login
    console.log("2️⃣  Testing Login Endpoint...");
    const loginRes = await makeRequest("POST", "/api/auth/login", {
      email: testEmail,
      password: "TestPass123",
    });
    console.log(`Status: ${loginRes.status}`);
    console.log(`Message: ${loginRes.body.message}`);
    console.log(`User: ${loginRes.body.user?.email}\n`);

    // Test 3: Get Profile (with token)
    if (token) {
      console.log("3️⃣  Testing Get Profile Endpoint...");
      const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/auth/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const profileRes = await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve({
              status: res.statusCode,
              body: JSON.parse(data),
            });
          });
        });
        req.on("error", reject);
        req.end();
      });

      console.log(`Status: ${profileRes.status}`);
      console.log(`Message: ${profileRes.body.message}`);
      console.log(
        `Profile User: ${profileRes.body.user?.firstName} ${profileRes.body.user?.lastName}\n`,
      );
    }

    // Test 4: Invalid credentials
    console.log("4️⃣  Testing Invalid Credentials...");
    const invalidRes = await makeRequest("POST", "/api/auth/login", {
      email: "nonexistent@example.com",
      password: "WrongPass123",
    });
    console.log(`Status: ${invalidRes.status}`);
    console.log(`Message: ${invalidRes.body.message}\n`);

    // Test 5: Validation error
    console.log("5️⃣  Testing Validation Error (weak password)...");
    const validationRes = await makeRequest("POST", "/api/auth/register", {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "weak",
    });
    console.log(`Status: ${validationRes.status}`);
    console.log(`Message: ${validationRes.body.message}`);
    console.log(`Errors:`, validationRes.body.errors, "\n");

    console.log("✅ All tests completed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Make sure the server is running on http://localhost:3000");
  }
}

runTests();
