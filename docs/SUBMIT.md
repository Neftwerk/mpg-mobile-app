# Submit

### Prerequisites

- IOS: You need to have an apple developer account with a $99 USD Apple Developer Program membership, see more in [IOS Prerequisites](https://docs.expo.dev/submit/ios/#prerequisites).
- ANDROID: You need to have a google service account key, see more in [ANDROID Prerequisites](https://docs.expo.dev/submit/android/#prerequisites).

### Steps.

#### Step 1: Setup your eas.json file with the production credentials.

```json
{
	"submit": {
		"production": {
			"android": {
				"serviceAccountKeyPath": "../path/to/api-xxx-yyy-zzz.json",
				"track": "internal"
			},
			"ios": {
				"appleId": "<your_apple_id>",
				"ascAppId": "<your_asc_app_id>",
				"appleTeamId": "<your_apple_team_id>"
			}
		}
	}
}
```

#### Step 2: Run the following command in your terminal to submit your app to the app store and google play store:

```bash
  npm run submit
```

You can run the command with the platform you want to submit, for example:

```bash
  npm run submit:android
  npm run submit:ios
```

#### Step 3: Follow the propmt instructions, when the proccess is finished you can see the builds in: https://expo.dev/accounts/your_user/projects/your_proyect_namel/submissions
