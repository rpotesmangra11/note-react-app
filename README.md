
# Note App

This is a note-taking application built with React with the end goal to set up a whole test automation CI/CD pipeline.

## Full Disclosure

The first load of this Heroku app may be slow due to the dynos having a startup time. This occurs because Heroku's dynos enter a sleep mode after a period of inactivity to conserve resources. When the app is accessed again, the dynos need time to wake up, causing a delay in the initial response. This startup delay is commonly referred to as a "cold start" and is a normal behavior on Heroku to manage resource usage efficiently.

## Frontend

The frontend of the application hosted on Heroku can be accessed [here](https://note-react-app-frontend-9297f33085da.herokuapp.com/).

## Backend

The backend of the application hosted on Heroku can be accessed [here](https://note-react-json-db-995df07f909e.herokuapp.com/notes).

## Automation Pipeline Workflow
Project Outline: Automated Testing with Jenkins
1. Jenkins Setup: As part of our continuous integration/continuous delivery (CI/CD) pipeline, we have set up Jenkins, a powerful automation tool. Our Jenkins setup includes jobs specifically configured to run our test cases.

2. Triggering Jenkins Job: We have leveraged Jenkins' ability to trigger jobs through webhooks. These are HTTP callbacks that send a GET or POST request to a configured URL when a specific event occurs. In our case, this event triggers our Jenkins job.

3. Running Test Cases: Upon receiving the GET request, Jenkins triggers the job configured to run our test cases. This job could be a simple script that runs our tests, or a more complex pipeline with several stages, depending on our needs.

4. Reporting: After the tests have been run, Jenkins generates a report based on the results. This report includes crucial information such as the number of tests passed/failed, code coverage, and more. We utilize various Jenkins reporting plugins to present these test results in different formats.

5. Notification: We have also configured Jenkins to send notifications based on the result of the job. For instance, if a test fails, Jenkins sends an email to our team or posts a message to our Slack channel, ensuring immediate attention and action. 

## Features

- **Create Note:** Users can create a new note by clicking on the 'Create Note' button. The note will be saved and displayed in the list of notes.

- **Edit Note:** Users can edit an existing note by clicking on the note. The changes will be saved when the user clicks on the 'Done' or 'Back' button.

- **Delete Note:** Users can delete a note by clicking on the 'Delete' button. The note will be removed from the list of notes.

## Known Bugs

- **Note Deletion:** When a user deletes a note (delete button works) by removing all the text and pressing back, the note is not immediately removed from the list of notes. The user has to refresh the page to see the updated list of notes.
- **Adding/Modifying note:** Produces the same behavior (above).
After some debugging, I realized this is because the GET for the notes list is being called before the PUT/POST/DELETE request goes through.

-You can see the GET request go first: 
-![image](https://github.com/rpotesmangra11/note-react-app/assets/40585885/4a0eeaf7-ac20-4f81-8b35-67f7b84035ed)

-Then the secondary CRUD operation:
-![image](https://github.com/rpotesmangra11/note-react-app/assets/40585885/575190d3-f6ae-4d6a-9bad-abe4f633cedb)

