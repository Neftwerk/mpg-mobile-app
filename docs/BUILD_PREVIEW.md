## Preview build

### Steps.

#### Step 1: Setup your preview profile in the eas.json file:

```json
{
	"build": {
		"preview": {
			"env": {
				"API_URL": "<your_api_url>",
				"OTHER_ENV_VARIABLE": "<your_other_env_variable>"
			},
			"distribution": "internal",
			"android": {
				"buildType": "apk",
				"gradleCommand": ":app:assembleRelease",
				"withoutCredentials": true
			},
			"ios": {
				"simulator": true,
				"buildConfiguration": "Release",
				"resourceClass": "m1-medium"
			},
			"cache": {
				"key": "preview-v1"
			}
		}
	}
}
```

#### Step 2: Run the following command in your terminal:

```bash
  npm run build:preview
```

#### Step 3: Follow the propmt instructions, when the proccess is finished you can see the builds in: https://expo.dev/accounts/your_user/projects/your_proyect_name/builds
