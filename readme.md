# Crowbar

Demo application to go along with my [NDC Oslo talk: Building a Serverless, EventSourced, Slack Clone](https://www.youtube.com/watch?v=8dvzgCcvdGY).

Any questions can be raised as issues here, or sent to me on twitter [@pondidum](https://twitter.com/pondidum) or on the email listed on my Github profile.

# Usage

* Parts are still missing, but most key concepts are included.
* [/infrastructure](infrastructure) contains all of the aws side code
  * you need to manually create and hook in Cognito Authentication, as terraform doesn't support it yet
    * api authorization
    * post-confirmation lambda
  * you might need to change s3 bucket names, as they are unique to an aws region, and someone else might be running a copy of this (e.g. me...)
* [/ui](ui) contains the static website ui
  * you can run this locally with `npm start`
  * you might need to disable CORS in your browser when doing this, or configure CORS on the api-gateway in aws

# Caveats

* I am not great at ui, so the react app might be a little more of a mess that I'd like
* This app is not complete!
  * I will add to it as I have time
  * pull requests welcome!
