# CartonCloudDemo
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
npm run build or yarn build
npm start or yarn start

```
Navigate to [http://localhost:3000/](http://localhost:3000) to confirm it's running.
