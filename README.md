# Blusalt_Challenge
Blusalt Software Engineering Challenge

### Procedure
- When a customer funds his account, a request (containing data including customerId, amount, etc) should be sent to the Billing service using a RESTful-based communication. 
The Billing service should then save the details (such as amount, customerId, status[pending], etc) and publish the transaction details to the Billing Service worker. This step should account for atomicity.
- The Billing Worker service should do the following: 
Implement a dummy charge method that waits for 100ms and resolves 
Update the record on the Billing service that has “transactionId” as the one received, with a status of “success”.

### Technologies used

- NodeJs
- ExpressJs
- RabbitMQ (for service to service communication)
- Chai & Mocha (for Testing)


By: Wakeel Kehinde
