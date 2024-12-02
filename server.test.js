import {
  saveParameters,
  appRegistration,
  openKeySession,
  getKeys,
} from "./server.js";
import io from "socket.io-client";

// Mocking Socket.io
jest.mock("socket.io-client", () => {
  return jest.fn().mockReturnValue({
    emit: jest.fn(),
    on: jest.fn(),
  });
});

describe("App Registration and Key Session Workflow", () => {
  let socket;

  beforeEach(() => {
    socket = io(); // Mocked socket.io client
    // Setting up the mock DOM elements
    document.body.innerHTML = `
      <div id="registration-log"></div>
      <button id="register-btn" disabled>Register App</button>
      <button id="key-session-btn" disabled>Open Key Session</button>
      <textarea id="keys-output"></textarea>
    `;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should save parameters correctly", () => {
    // Simulate filling the form and saving parameters
    document.getElementById("app_name").value = "Alice";
    document.getElementById("my_ip").value = "10.30.2.117";
    document.getElementById("my_port").value = "1234";
    document.getElementById("controller_ip").value = "146.48.81.163";
    document.getElementById("key_manager_ip").value = "10.79.1.47";
    document.getElementById("key_manager_port").value = "8001";
    document.getElementById("other_app_ip").value = "10.30.2.118";
    document.getElementById("other_app_port").value = "1234";

    saveParameters();

    expect(document.getElementById("app_name").value).toBe("Alice");
    expect(document.getElementById("my_ip").value).toBe("10.30.2.117");
    expect(document.getElementById("controller_ip").value).toBe(
      "146.48.81.163"
    );
  });

  test("should enable button and proceed after app registration success", () => {
    // Mocking successful registration response
    socket.on.mockImplementationOnce((event, callback) => {
      if (event === "get_app_registration") {
        callback({ code: 200, body: { sae_id: "12345" } });
      }
    });

    // Simulate the app registration process
    appRegistration();

    // Check if the registration log is updated
    expect(document.getElementById("registration-log").textContent).toContain(
      "App Registration Successful"
    );

    // Ensure the next button (key session) is enabled
    expect(document.getElementById("key-session-btn").disabled).toBe(false);
  });

  test("should open key session and proceed after success", () => {
    // Mocking successful session open response
    socket.on.mockImplementationOnce((event, callback) => {
      if (event === "get_open_key_session") {
        callback({ code: 200, app_id: "app123", other_app_sae_id: "sae678" });
      }
    });

    // Simulate the key session opening process
    openKeySession();

    // Check if the session log is updated
    expect(document.getElementById("key-session-log").textContent).toContain(
      "Key Session Opened"
    );

    // Ensure the next step (Get Keys) button is enabled
    expect(document.getElementById("get-keys-btn").disabled).toBe(false);
  });

  test("should retrieve keys successfully and update output", () => {
    // Mocking successful key retrieval
    socket.on.mockImplementationOnce((event, callback) => {
      if (event === "response_get_key") {
        callback({ code: 200, keys: [{ key_ID: "001", key: "sampleKey" }] });
      }
    });

    // Simulate the key retrieval process
    getKeys();

    // Check if the keys are displayed in the textarea
    expect(document.getElementById("keys-output").value).toContain(
      "Key ID: 001\nKey: sampleKey"
    );
  });
});
