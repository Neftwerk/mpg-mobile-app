## Setup and Testing Steps

### 1. Download BrowserStack Local Binary

Download the BrowserStack Local Binary for Ubuntu from the [BrowserStack Binary Downloads](https://www.browserstack.com/docs/live/local-testing/set-up-local-testing#Linux) page.

### 2. Start BrowserStack Local Connection

Run the following command in your terminal:

```bash
./BrowserStackLocal --key <your_key> --verbose 3
```

### 3. Start Expo Server

Start your Expo development server with the next command:

```bash
npm start:tunnel
```

### 4. Access the App on BrowserStack

1. Wait for the Metro server to start
2. Copy the Metro URL from your terminal
3. Open Safari on your BrowserStack device
4. Paste the Metro URL to load your app
