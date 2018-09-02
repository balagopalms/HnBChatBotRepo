'use strict';

module.exports = (req, res) => {
    console.log("DialogFlow Test service is called");

    const projectId = 'fbchatbot-407ef'; 
    const sessionId = 'quickstart-session-id';
    const query = 'hello';
    const languageCode = 'en-US';

    const credentials = {
        client_email: 'dialogflowfbchatbot@fbchatbot-407ef.iam.gserviceaccount.com',
        private_key:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHblD3cSH1TS2y\nRJbZR7dPAXQUTfDccSeagYH/YJ+Oi+OVgEkNnRkE+D/ziN8iYwoM/q8ogOvoXUf/\nsYPMur6uOxzp8RklQjDF4q7nIpGUY1bt5pgIY3RNlJcYTyYWftX7WExLw2QlkI4C\n1oQ5zgGaz2/LNHEvrWIygDgp6yYY23AGi6rdLmJzlD63ah9REUCoctiMi1qSi0T1\nxhTlAPTbG1qltI/JKs6+VJf81Re8/xEUBrSvmaw5olMWu8yGK1gSc4XLxj8Kx7JZ\nuuuSKrhW5bH4+cup77JNUEifS/cFFWYAzXaNV0lJBVCiyuUosJocuRp5gQUof472\nTFR6ETgxAgMBAAECggEABKVchAMx8hO/9Ib2B65Mxi2nvWBac9w7+rS5KVCgLvMx\n1FYGfadzAYNiBAOkhRnPDmHxhS1JsaJYrst9IUwZbJgqcoXAGvbZiYagIfjTcORG\njmjAknN0rmj/gxy266+9Put97YbqApkFQeoq7ujOb0OVXGPGnkB5COmlRU651rrd\nZrsJw6gBo9l48dbOx2sPVx7XBD8V4AHb+Kh7iC60aziiioV9ZkIgkljeXaAWA+na\nXX4F/FzB39T3tYRjN9WGBFZGycV5IUlTBoFRfFdg7XfdnhSIvUXAJfiUuYuDR0ZZ\nq2X8NraT0Doe3gQlI8F9JosM8oaTidTmXTewyU19sQKBgQD16iNQ2Iz07jumZ9zK\niBLkoOm6raJY7nGvIdoj10TOYs/zzKgO2pG/dg11itTYd0zzywBVAV9snj4QwmjT\nF700un7d2qJJbMuSi2QTlXcIulcaPNP+/IeVi0aAbitRHDcm+Z8/cTsdrRnNOOOw\naBK1a3gG1ddgzi1AU4XAxNr1eQKBgQDPnCUytRCMMBsM4KI6obNSprbT074aUNnp\n6iWBsFdm1AEpM1Zg3T0o23dDj/sxex9vQ1ezVA+I/g3F6oELwTjMzdMu/06mTfgM\nN2orgVCWBk/IlGzBxNdWRpcEPanWRyohDl1bAE+PCDVGcLvgoysCPXCdVK7fA1mG\nvu+oNRpCeQKBgQCx60zR2Vtielq98rdT8U96CtIQNkAXh6zIwP1KoR0vFV7PTWrq\nFEkO9SKXwHJuiyIp4N3EotGfjH3rMj0VPT+vPp87dEumRAilZiRp5uHQdsE+QnQ/\nMAYItFO15/9/F6Lvl/sXs5zJw8u/J0HVB/dBOxgEGgNSDtm+iK9k4QhqQQKBgB3E\noNzNc4r2VtqY1wobJ3BBcVOcN9TkJOrSZQBcfZvD6Eq1Dryi3GMgXNB2M6lbox08\nBbYz5mpZKzZmsowx72gGVzKU7v0PjvKJe5KzXw+z5fq3tYRvKgU35+12vgR4fcTx\nn1cuCzpSDfmErpu+KauPjbcxbkWR4GNeu1ReEN7ZAoGALxg4BZ0HyRdfHX4KcUZ+\n0lpgJ7qfhvlOBSemO9DEaoJM2kDQq37HtInqQgGkKYNQLQnRRONyoDkJJUBq8BlY\nz/KeD5cIaMXl1xVCw1de01s4tRlo7Oq+JqiUtkoP69LwyU8eklS5I3AU35Jl2/VH\naZBkNHtqCsf2hAdUEZMlwKE=\n-----END PRIVATE KEY-----\n',
      };

    // Instantiate a DialogFlow client.
    const dialogflow = require('dialogflow');
    const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

    console.log("Defined Session Client.");

    // Define session path
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
            text: query,
            languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    sessionClient
    .detectIntent(request)
    .then(responses => {
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
        } else {
        console.log(`  No intent matched.`);
        }
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
        res.status(200).send("OK");
    }