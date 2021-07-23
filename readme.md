# Automatic Looker API Auth Token Renewal in Postman

Are you lazy like me and want to avoid having to refresh your auth token periodically when using the Looker API in Postman? This guide will help you to configure your Postman collection with a pre-request script that checks if the current token is expired and authenticates you and stores the access token if it is.

### STEP 1: Read the article
The script below is based off the concepts [in this article](https://medium.com/@allen.helton/how-to-automate-oauth2-token-renewal-in-postman-864420d381a0), which is worth a quick read.

### STEP 2: Create AND INIT Variables
We'll want to create the same variables laid out in the article, except instead of the `Basic_Auth` collection variable, we'll create two collection variables called `id` and `secret`. We'll set the Initial Value and Current Value of the three Collection Variables as such:

**id**: your API Client ID from Looker

**secret**: your API Client Secret from Looker

**Auth_Url**: the /login endpoint of your Looker instance (i.e. https://instance.looker.com:19999/api/3.1/login)

### Step 3: Add pre-request script
Edit your Looker collection and add the following as a pre-request script. This will run before every request in that collection (the auth call will only run if the token is expired).
