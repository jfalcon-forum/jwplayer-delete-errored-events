# jwplayer-delete-errored-events

When changing programs on the WDAY+ livestream, an errored event gets created. This event contains a status of `errored`. We want to automatically delete these events upon creation.

Triggered by JWPlayer webhook that runs when live channels are live.

`npm install`

create .env file for JWPLAYER_SECRET

To run locally, you'll need to create a main() function. Currently setup to work within the aws lambda framework
