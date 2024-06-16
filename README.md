
# Note App

This is a note-taking application built with React with the end goal to set up a whole test automation CI/CD pipeline.

## Full Disclosure

The first load of this Heroku app may be slow due to the dynos having a startup time. This occurs because Heroku's dynos enter a sleep mode after a period of inactivity to conserve resources. When the app is accessed again, the dynos need time to wake up, causing a delay in the initial response. This startup delay is commonly referred to as a "cold start" and is a normal behavior on Heroku to manage resource usage efficiently.

## Frontend

The frontend of the application hosted on Heroku can be accessed [here](https://note-react-app-frontend-9297f33085da.herokuapp.com/).

## Backend

The backend of the application hosted on Heroku can be accessed [here](https://note-react-json-db-995df07f909e.herokuapp.com/notes).

## Project Outline: Automated Testing with Jenkins
1. **Jenkins Setup:** As part of my continuous integration/continuous delivery (CI/CD) pipeline, I have set up Jenkins, a powerful automation tool. My Jenkins setup includes jobs specifically configured to run test cases.

3. **Triggering Jenkins Job:** I have leveraged Jenkins' ability to trigger jobs through webhooks. These are HTTP callbacks that send a GET or POST request to a configured URL when a specific event occurs. In my case, this event triggers a Jenkins job. I trigger this using a simple curl command: curl -v -X POST http://localhost:8080/job/just-do-it-note-ci-cd/build --user admin:id

4. **Running Test Cases:** Upon receiving the GET request, Jenkins triggers the job I have configured to run my test cases. This job could be a simple script that runs the tests, or a more complex pipeline with several stages, depending on the needs. In my case, I have implemented (as of now)a pipeline that uses  a Jenkinsfile. This is read from my test case GitHub repo, so Jenkins knows what to do. Here is an example run:
![image](https://github.com/rpotesmangra11/note-react-app/assets/40585885/927c6c7d-23f9-4d1c-a7f9-350da6a0ec93)
![image](https://github.com/rpotesmangra11/note-react-app/assets/40585885/25be3073-c531-4798-9576-7ea9b3f4e06f)
![image](https://github.com/rpotesmangra11/note-react-app/assets/40585885/ba7200e2-e948-47b7-a3cd-73b7f8b78281)

This is my JenkinsFile that tells Jenkins what to do:


    pipeline {
    agent { label 'windows' }
    
    stages {
        stage('Install') {
            steps {
                echo 'Starting the Install stage...'
                bat 'npm install'
                echo 'Finished the Install stage.'
            }
        }

        stage('Test') {
            steps {
                echo 'Starting the Test stage...'
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npm run note-tests'
                }
                echo 'Finished the Test stage.'
            }
        }

        stage('Publish Reports') {
            steps {
                echo 'Starting the Publish Reports stage...'
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/results',
                    reportFiles: 'mochawesome.html',
                    reportName: 'Mochawesome Report'
                ])
                echo 'Finished the Publish Reports stage.'
            }
        }
        stage('Upload Report') {
            steps {
                echo 'Starting the Upload Report stage...'
                git credentialsId: '995a8fdc-ed31-4a1c-949b-1b3f32a0b760', url: 'https://github.com/rpotesmangra11/just-do-it-note-test-cases.git'
                bat 'git config user.email "potesmangrar11@gmail.com"'
                bat 'git config user.name "rpotesmangra11"'
                bat 'git add cypress/results/mochawesome.html'
                bat 'git commit -m "Add test report"'
                bat 'git push'
                echo 'Finished the Upload Report stage.'
            }
        }
    }
    post {
        success {
            echo 'Build was successful!'
        }
    }
}
5. **Reporting:** After the tests have been run, Jenkins generates a report based on the results. This report includes crucial information such as the number of tests passed/failed, code coverage, and more. I utilize various Jenkins reporting plugins to present these test results in different formats.

6. **Notification:** I have also configured Jenkins to send notifications based on the result of the job. For instance, if a test fails, Jenkins sends an email to me or posts a message to my Slack channel, ensuring immediate attention and action.
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

