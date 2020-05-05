### This API has three endpoints
- The initial landing page ('/').
- The top questions endpoint ('api/topquestions').
- The answers endpoint ('api/answer').

If a user tries accessing any other undefined endpoint, an error router wil be triggered which will send them a 404 response (Page/Resource not found).

### Top Questions endpoint (api/topquestions)
When accessing this endpoint the user needs to provide a tag, using which the API will return as a response an array of the top 10 recent questions related to that tag that have been asked on Stack Overflow with the latest question in the beginning of the array. If no tag is provided, then the API returns an array of the top 10 recent questions that have been asked on Stack Overflow with the latest question in the beginning of the array without using any filters on them.

### Answers endpoint (api/answer)
When accessing this endpoint the user needs to provide a question ID, using which the API will return the question related to that question ID and an accepted answer to that question. If the question has no accepted answer then instead of a single answer, an array will be returned which will consist of all the answers on that question with the latest answer in the beginning and the oldest answer at the end. If no question ID is provided by the user, then a **400 Bad Request response status code** will be sent back to the user as a response.

Accept a question id and response should be the question along with the accepted answer. If no accepted answer then return all answers ordered by maximum votes
