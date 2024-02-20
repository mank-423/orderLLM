const { OpenAI } = require('openai');

// Dotenv configuration
require('dotenv').config();
const OPEN_AI_KEY = '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';

// One environment of openai
const openai = new OpenAI({
    apiKey: OPEN_AI_KEY,
});

// Define an async function to retrieve assistant information
const getAssistantInfo = async () => {
    try {
        // const assistant = await openai.beta.assistants.create({
        //     name: "Receptionist",
        //     instructions: "You take the order placed by the consumer. There are 2 products, Phone which is of 40 rupees and Tablet of 60 rupees. Give the user the end money to pay",
        //     model: "gpt-3.5-turbo-1106"
        // });

        const assistant = await openai.beta.assistants.retrieve('asst_ZEGiFtais1PISnZ3dXpe9UJ3')

        console.log("Assistant created: ", assistant.id);

        const thread = await openai.beta.threads.create();
        console.log("Thread created: ", thread.id);

        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: "I want to order a phone. What will be the final cost?"
        });
        console.log("Message created!");

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.id,
            instructions: "Address the user as Mayank and give back what he needs to pay"
        });
        console.log("Run created", run.id);

        const checkStatus = async (threadId, runId) => {
            let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);

            if (runStatus.status === 'completed') {
                let messages = await openai.beta.threads.messages.list(threadId);
                messages.body.data.forEach((message) => {
                    console.log(message.content);
                });
            } else if (runStatus.status === 'requires_action') {
                let messages = await openai.beta.threads.messages.list(threadId);
                console.log("Requires action");
                console.log(messages);
            } else {
                console.log("Run is not completed yet");
            }
        };

        setTimeout(() => {
            checkStatus(thread.id, run.id);
        }, 3000);

    } catch (error) {
        console.error("Error retrieving assistant information:", error);
    }
};

// Call the async function
getAssistantInfo();
