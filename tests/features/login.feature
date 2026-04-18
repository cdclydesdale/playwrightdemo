Feature: User Login
 Scenario: Successful login with valid credentials
   Given the user is on the login page
   When the user enters valid email and password
   And clicks the login button
   Then the url should contain the email and password information