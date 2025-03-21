# Neftwerk UI

Neftwerk functions as a digital wallet, a social media platform, and a virtual gallery, streamlining access to the contemporary art market.

This project was created and [runs with Expo Go](https://expo.dev/client)

## Index

- [Installation and setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Tests](#tests)
- [Builds and Submissions](#builds-and-submissions)

## Installation and setup

> ⚠️ It's recommended to use [Visual Studio Code](https://code.visualstudio.com/) as well as [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) extensions for development using this template. It's also recommended to use Node version 18.x.

## Installing the project

Before installing copy the `.env.dist` file to `.env` and fill with your own values.

```
npm install # Install dependencies
npm run prebuild # Generate build folders for ios and android
```

## Running the project

```
npm start # Run Metro server
npm run android # Run app on an Android device or emulator
npm run ios # Run app on an IOS device or emulator
npm run web # Run app on a browser
```

## Environment Variables

#### Application

| Variable                 | Description              |
| ------------------------ | ------------------------ |
| `EXPO_PUBLIC_API_URL`    | Neftwerk Api server url. |
| `EXPO_PUBLIC_SENTRY_DSN` | Your Sentry DSN.         |
| `SENTRY_AUTH_TOKEN`      | Your Sentry Auth Token.  |

#### Account Recovery

| Variable                                       | Description                      |
| ---------------------------------------------- | -------------------------------- |
| `EXPO_PUBLIC_ACCOUNT_RECOVERY_PLANET_PAY_NODE` | PlanetPay Account Recovery Node. |
| `EXPO_PUBLIC_ACCOUNT_RECOVERY_BIGGER_NODE`     | Bigger Account Recovery Node.    |

#### Stellar

| Variable                                 | Description                 |
| ---------------------------------------- | --------------------------- |
| `EXPO_PUBLIC_STELLAR_NETWORK_PASSPHRASE` | Stellar Network Passphrase. |

## Tests

This project uses two testing frameworks:

- [Detox](https://wix.github.io/Detox/docs/introduction/getting-started) for end-to-end (e2e) testing
- [Jest](https://jestjs.io/) for unit testing
- [Wiremock](http://wiremock.org/) for API mocking during e2e tests

### E2E Testing with Detox

#### Prerequisites

> ⚠️ Before running tests, ensure you:
>
> 1. Run `npm run prebuild` if you've made changes to `app.json` or native files
> 2. Have an Android emulator properly configured and running
> 3. Have all dependencies correctly installed

See the [TESTING](docs/TESTING.md) page for more information instructions.

## Testing with BrowserStack

BrowserStack allows you to test your app on IOS and Android real devices.

#### Prerequisites

- Be member of bigger organization in BrowserStack.
- Have an apple account.
- Have a device running in BrowserStack, view [BrowserStack Devices](https://app-live.browserstack.com/#os=iOS&os_version=18.0&zoom_to_fit=true&full_screen=true&speed=1).
- Have installed expo go in the browserstack device.
- Expo project set up and running.

For ubuntu, see [Testing Guide](./docs/BROWSERSTACK_UBUNTU_TESTING.md) page.

##### Additional Resources

- [BrowserStack Documentation](https://www.browserstack.com/docs/)

## Builds and Submissions

#### Prerequisites

```bash
npm install -g eas-cli # Install eas-cli
eas login # Login to eas
eas build:configure # Configure build and generate eas.json file
```

Ensure that you have this envs values for upload the sentry source maps in the `eas.json` file.
![image](https://github.com/user-attachments/assets/2fa0583c-fb33-413e-81c7-78a411808a0e)

For preview builds see the [BUILD_PREVIEW](docs/BUILD_PREVIEW.md) page.

For build to the store see the [BUILD](docs/BUILD.md) page.

For submit to the store see the [SUBMIT](docs/SUBMIT.md) page.
