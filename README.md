# CartonCloudDemo

## Notes
The react app in this repository was generated using [create-react-app](https://github.com/facebook/create-react-app).  Due the the complexities in ejecting and reconfiguring an app generated in this way, the api calls are being made with full pathnames and CORS / OPTIONS requests have been enabled in the PHP API.  This is to allow react fetch preflight and cross-domain requests (:3000 to :8000).  In a production setting, native webpack configuration is a much better solution and would avoid these issues.

#### Improvements that could be made
* Inline form validation ([like this example](https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs)).  Currently app only validates after a submit attempt.  This could be improved to validate as the user inputs.
* Consolidate Create and Update into one component.

### Requirements
[PHP 5.4 or later](http://php.net/manual/en/install.php)

[Yarn](https://yarnpkg.com/lang/en/docs/install/) or [NPM](https://docs.npmjs.com/cli/install)

## To start PHP API
**_Please note:_** You will need to use the supplied PHP files (or at least deliveries.php) as I have made modifications to the API to enable CORS and OPTIONS requests.  These are required for React Fetch requests.
```
 cd Carton_Cloud_PHP
 php -S localhost:8000
```
Visit [http://localhost:8000/](http://localhost:8000/) to confirm it's running.

## To start React App
In a new tab or window
```
cd cartoncloud
npm install or yarn install
npm start or yarn start

```
Navigate to [http://localhost:3000/](http://localhost:3000) to confirm it's running.
