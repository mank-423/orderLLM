import { model } from 'mongoose';
import { OpenAI } from 'openai';
import fetch from 'node-fetch';

// Dotenv configuration
const OPEN_AI_KEY = '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';

// One environment of openai
const openai = new OpenAI({
    apiKey: OPEN_AI_KEY,
});

// Function to get cat facts
async function getLocation() {
    const response = await fetch("https://ipapi.co/json/");
    const locationData = await response.json();
    return locationData;
}

async function getCurrentWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
}

const itemMap = {
    'Banana': 20,
    'Apple': 2000,
    'Whey protein': 4000,
}

const tools = [
    {
        type: "function",
        function: {
            name: "getCurrentWeather",
            description: "Get the current weather in a given location",
            parameters: {
                type: "object",
                properties: {
                    latitude: {
                        type: "string",
                    },
                    longitude: {
                        type: "string",
                    },
                },
                required: ["longitude", "latitude"],
            },
        }
    },
    {
        type: "function",
        function: {
            name: "getLocation",
            description: "Get the user's location based on their IP address",
            parameters: {
                type: "object",
                properties: {},
            },
        }
    },
];

// Generate the product price list as a string
const priceListString = Object.entries(itemMap).map(([item, price]) => `Price of one ${item} is ${price} rupees`).join(", ");
// console.log(priceListString);

const messages = [
    {
        role: "system",
        content:`You are a helpful receptionist assistant. The pricing is as follows: ${priceListString}, calculate the final price based on the order and politely tell customer the final price like a receptionist.`,
    },
];

async function agent(userInput) {
    messages.push({
        role: "user",
        content: userInput,
    });

    const availableTools = {
        getCurrentWeather,
        getLocation,
    };


    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: [
            {
                role: "system",
                content:`You are a helpful receptionist assistant. The pricing is as follows: ${priceListString}, calculate the final price based on the order and politely tell customer the final price like a receptionist.`,
            },
            {role: 'user', content: userInput}
        ],
    })

    const reply = response.choices[0].message.content;
    // console.log(reply);
    return reply;

    // for (let i = 0; i < 5; i++) {
    //     const response = await openai.chat.completions.create({
    //         model: "gpt-3.5-turbo-0613",
    //         messages: messages,
    //         tools: tools,
    //         tool_choice: "auto",
    //     });
    //     const { finish_reason, message } = response.choices[0];

    //     if (finish_reason === "tool_calls" && message.tool_calls) {
    //         const functionName = message.tool_calls[0].function.name;
    //         const functionToCall = availableTools[functionName];
    //         const functionArgs = JSON.parse(message.tool_calls[0].function.arguments);
    //         const functionArgsArr = Object.values(functionArgs);
    //         const functionResponse = await functionToCall.apply(null, functionArgsArr);

    //         messages.push({
    //             role: "function",
    //             name: functionName,
    //             content: `
    //             The result of the last function was this: ${JSON.stringify(
    //                 functionResponse
    //             )}
    //             `,
    //         });
    //     } else if (finish_reason === "stop") {
    //         messages.push(message);
    //         return message.content;
    //     }
    // }
    // return "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input.";
}
const response = await agent(
    "Which product from your menu should I choose if I want to go on diet?"
);
console.log(response);