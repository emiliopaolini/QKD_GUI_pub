**SDN-QKD Dashboard**
---------------------

The **SDN-QKD Dashboard** allows users to interact with a Quantum Key Distribution (QKD) and Software-Defined Networking (SDN) system, guiding them through a series of steps: input parameters, app registration, opening a key session, and retrieving keys. The frontend communicates with the backend using **Socket.io** for real-time communication.

### **Features**

1.  **Step 1: Input Parameters**: Collects necessary parameters such as App Name, IPs, and Ports.
    
2.  **Step 2: App Registration**: Registers the app with the server and retrieves the SAE ID.
    
3.  **Step 3: Open Key Session**: Initiates the key session between two apps and retrieves app and SAE IDs.
    
4.  **Step 4: Get Keys**: Retrieves quantum keys from the server.
    
5.  **Buttons and Navigation**: Buttons are enabled sequentially after each step is completed successfully. Each button click triggers backend communication via **Socket.io**.
    
6.  **Logs and Feedback**: Logs are displayed at each step to provide feedback to the user.
    

### **Technologies Used**

*   **HTML**: Structure of the page and forms.
    
*   **CSS**: For styling and layout of the dashboard.
    
*   **JavaScript**: Handles frontend logic and interaction.
    
*   **Socket.io**: For real-time communication with the backend.
    
*   **Jest**: For unit testing JavaScript functions and Socket.io interactions.
    

### **Setup Instructions**

#### 1\. **Clone the Repository**

```bash
git clone <repository-url>
cd <project-directory>
```

#### 2\. **Install Dependencies**

To run the application and tests, you need the following dependencies:

**For the frontend (HTML, CSS, and JavaScript)**:

*   No specific installation is required for the frontend as it only involves static files (HTML, CSS, and JS).
    

**For Testing (Jest & Socket.io)**:Install the necessary testing dependencies:

```bash
npm install --save-dev jest jsdom socket.io-client
```

**For Backend (Optional, for Socket.io server)**:If you are running the backend server locally (for testing the socket communication), make sure to have a **Node.js server** that uses **Socket.io** to handle the events.


#### 3\. **Run the Application**

Open the index.html file directly in your browser to run the app:

*   The app uses Socket.io to communicate with the backend, so ensure the server is running (see backend setup).
    

Alternatively, if you'd like to serve the HTML file with a simple HTTP server, you can use tools like **Live Server** in VSCode or set up a static server.

#### 4\. **Run Unit Tests**

If you wish to run the unit tests, use the following command:


```bash
npm test
```

This will run all the Jest tests in your tests folder.

#### 5\. **Backend (Optional)**

If you wish to run the backend with **Socket.io** support, create a **server.js** file as mentioned earlier, and run:

```bash
node server.js
```

This will start a local server on **http://localhost:7001**. The frontend will then interact with this backend server using **Socket.io**.

### **Functional Flow**

1.  **Input Parameters**: Enter the required values like app\_name, my\_ip, my\_port, etc.
    
    *   When the user clicks "Save Parameters", the data is saved, and the **"Register App"** button is enabled.
        
2.  **App Registration**:
    
    *   Click "Register App" to trigger the app registration process.
        
    *   On successful registration, the **"Open Key Session"** button is enabled.
        
3.  **Open Key Session**:
    
    *   Click "Open Key Session" to initiate the key session.
        
    *   On successful key session opening, the **"Get Keys"** button is enabled.
        
4.  **Get Keys**:
    
    *   Click "Retrieve Keys" to fetch the keys from the server and display them in a textarea.
        

### **Testing the Application**

The **unit tests** are written using **Jest** to ensure that the core functionality works as expected. The tests focus on:

*   **Button enable/disable logic** based on success.
    
*   **Socket.io communication** mock testing.
    
*   **DOM manipulation** based on backend responses.
    

#### **Test Cases**:

*   **saveParameters()**: Verifies that parameters are correctly saved.
    
*   **appRegistration()**: Ensures that the app registration button is enabled after successful registration and displays the correct log.
    
*   **openKeySession()**: Verifies that the "Open Key Session" button is enabled after opening the key session and logs the appropriate message.
    
*   **getKeys()**: Ensures that keys are successfully retrieved and displayed in the textarea.
    

### **Additional Notes**

*   **Socket.io Events**:
    
    *   **app\_registration**: Sends the app registration data to the backend.
        
    *   **open\_key\_session**: Opens the key session between apps.
        
    *   **get\_key**: Retrieves the quantum keys.
        
*   **Error Handling**: Errors are handled with alert messages and log updates to inform the user if something goes wrong during the process.