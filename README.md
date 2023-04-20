# Pursuit Technical Assessment - Student Registration form.

https://pursuit-registration-form.netlify.app

Originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## A note about time taken

My background experience in Frontend JS is majoritively based in Vue and Gridsome. While i do have some experience with react metaframeworks (Gatsby), this is the first time I've really dealt with vanilla React in a client-side rendering context, and also the first time working with MailTrap and EmailJS, so there was a fair bit of extra time committed to research and experimentation during the project. For the sake of transparency I should mention that **including setup, research and experimentation I probably spent 12 hours total on this project**.

## Libraries and services used

For the sake of ease, the following libraries were used:

- tailwind.css was used for their utility classes. I noticed that you used it (or something similar) for Pursuit and Acorn, so assumed it was fair game.
- react-hook-form - provided easy hook functionality for me to check for form values in conditional form rendering.

For mail sending and data collection...

- Netlify was originally used to start receiving form data as it is what I am most familiar with. However, they do not support sending files as attachments- nor multiple files in one field. While I changed the mail sender, I kept netlify's form detection functionality as Netlify's form submissions tracker was useful for monitoring form data structure on send.
- EmailJS was used as a "serverless" delivery service, as it allowed me to send "from" the email address i registered my account with during testing. (This was chosen as i did not have the time to purchase/configure a domain for sending at this time)
  - MailTrap SMTP details were configured in EmailJS - [details of the process was documented by MailTrap](https://mailtrap.io/blog/react-send-email/).
- As part of their email template system, EmailJS only handles one file per field variable. Instead of trying to account for an unknown amount of files, or putting a maximum limit on files alone, i took the approach of compressing all the files into a .zip and attaching it to one variable. To do this, i chose [JSZip](https://www.npmjs.com/package/jszip), as it had the option to encode the zip in a format that EmailJS could accept.

## Interesting things I have learnt

- As netlify's original intention was for hosting sites that use Server Side Rendering, their form registration and validation is done on Build. So even though my form is handled using JSX clientside, i _also_ had to create the form as just HTML in /public/. This allows Netlify to find the form variables, and then retrieve the values on submit.

<details>
<summary>Create React App original readme documentation</summary>

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

</details>
