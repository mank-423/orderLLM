const { config } = require("dotenv");
const { ChatPromptTemplate } = require('@langchain/core/prompts')
const { ChatOpenAI } = require('@langchain/openai')
const { StringOutputParser } = require('@langchain/core/output_parsers')
const { OpenAI } = require('openai');
const Order = require('../models/OrderModel')

const outputParser = new StringOutputParser();

config();

let history = [];

let status = "continue"

const menuItems = [
    { name: "Pizza", description: "A delicious cheese pizza", price: "$10" },
    { name: "Burger", description: "Juicy beef burger with lettuce and tomato", price: "$8" },
    { name: "Salad", description: "Fresh garden salad with your choice of dressing", price: "$7" }
];


// If user has interacted before or not
let userHasInteracted = false;

//Converting the menu into a single line
const menuDescription = menuItems.map(item => `${item.name}: ${item.description} - ${item.price}`).join(", ");

//Instance of chat model
const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_KEY,
});

// One environment of openai
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});



const confirmOrder = async (req, res) => {
    const { orderStatement } = req.body;

    try {
        const prompt = ChatPromptTemplate.fromMessages([
            ['system', 'Based on the the statement' + orderStatement + ', extract the order item, quantity, and price of each order in object, use key named `orders` for denoting orders']
        ]);

        // Chain creation
        const llmChain = prompt.pipe(chatModel).pipe(outputParser);

        //  Making a json object out of it
        const response = await llmChain.invoke({ input: orderStatement });
        // console.log(response)

        //  Parsing the JSON
        const formatResponse = JSON.parse(response);
        // console.log(formatResponse.orders);

        //Calculate the final price
        const finalPrice =  formatResponse.orders.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0);

        // // Save to the database
        // Create a new Order document
        // const newOrder = new Order({
        //     username: "dummyUsername", // Replace with the actual username logic
        //     order: formatResponse.orders,
        //     finalPrice,
        // });

        // // Save the newOrder document to the database
        // const savedOrder = await newOrder.save();

        // console.log("Saved order details:", savedOrder);

        // , savedOrder
        res.status(200).json({ response:{formatResponse, finalPrice} });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

const chatOrder = async (req, res) => {

    const { userPrompt } = req.body;

    try {

        //Check the prompt
        // const statusPrompt = ChatPromptTemplate.fromMessages([
        //     ["system", "Identify the context from the prompt whether user wants to continue the conversation or end it. And respond with continue/end."]
        // ]);
        // const checkerChain = statusPrompt.pipe(chatModel).pipe(outputParser);

        // const responseStatus = await checkerChain.invoke({input: userPrompt});

        // console.log(responseStatus);

        const responseStatus = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0613",
            messages: [
                {
                    role: "system",
                    content: `Identify the context from the prompt whether user wants to continue the conversation or end it. And respond with either continue or end, and nothing else.`,
                },
                { role: 'user', content: userPrompt }
            ],
        })

        status = responseStatus.choices[0].message.content;

        if (status === 'end') {
            history.push(["user", userPrompt]);
            history.push(["system", "Summarize the order as item, quantity and price of one item and end the conversation."]);

            const prompt = ChatPromptTemplate.fromMessages(history);

            // Chain creation
            const llmChain = prompt.pipe(chatModel).pipe(outputParser);
            const response = await llmChain.invoke({ input: userPrompt });
            console.log(status)
            res.status(200).json({ response, status });
        }
        else {

            if (userHasInteracted) {
                //If the user has interacted
                //Then we need to store as user -> system -> user ....
                history.push(["user", userPrompt])
            } else {
                // Your name is Order LLM and you help people in ordering food from the menu:" + menuDescription + "You are developed by Mayank Kumar.
                const firstTimeGreet = "Hello! Welcome to our restaurant. How can I assist you today?\n\nOur menu includes:\n" + menuDescription + "\n\nPlease let me know if you need any help with your order. What would you like to have today?";
                history.push(["system", "Your name is Order LLM and you help people in ordering food from the menu" + menuDescription + ". Greet people with the greet" + firstTimeGreet + "You are developed by Mayank Kumar."])
                history.push(["user", userPrompt]);
            }

            const prompt = ChatPromptTemplate.fromMessages(history);

            // Chain creation
            const llmChain = prompt.pipe(chatModel).pipe(outputParser);
            const response = await llmChain.invoke({ input: userPrompt });

            history.push(["system", response])
            console.log(status)
            res.status(200).json({ response, status });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}


module.exports = {
    confirmOrder, chatOrder
}