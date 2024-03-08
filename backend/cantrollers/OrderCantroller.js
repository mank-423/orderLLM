const { config } = require("dotenv");
const { ChatPromptTemplate } = require('@langchain/core/prompts')
const { ChatOpenAI } = require('@langchain/openai')
const { StringOutputParser } = require('@langchain/core/output_parsers')
const { OpenAI } = require('openai');
const Order = require('../models/OrderModel')
const cleanAndParseJson = require('../utils/cleanAndParse');

const outputParser = new StringOutputParser();

config();

let history = [];

let status = "continue"

const menuItems = [
    { name: "Pizza", description: "A delicious cheese pizza", price: "$10" },
    { name: "Burger", description: "A Cheese burger", price: "$8" },
    { name: "Salad", description: "Fresh vegetable salad", price: "$7" }
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

const getAllOrders = async (req, res) => {
    const { username } = req.query;

    try {
        const orders = await Order.find({ username });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const confirmOrder = async (req, res) => {
    const { orderStatement, username } = req.body;

    try {
        // Replace all occurrences of \n with an empty string
        const cleanedOrderStatement = orderStatement.replace(/\n/g, "");
        //  System prompt 
        const promptOrder =
            `Given the following order summary, extract the item, quantity and price for each item, and present the details in JSON format without including the currency symbol.\
            Order Summary:${cleanedOrderStatement}.\
            Please format the extracted details as JSON in the following structure: array of all json orders with each object containing "item", "quantity" and "price" keys. Call the array 'items'.`;

        const prompt = ChatPromptTemplate.fromMessages([
            ['system', promptOrder]
        ]);

        // Chain creation
        const llmChain = prompt.pipe(chatModel).pipe(outputParser);

        //  Making a json object out of it
        const response = await llmChain.invoke({ input: orderStatement });
        // console.log("Response of llm:",response)

        // Use the utility function to clean and parse the response
        const formatResponse = cleanAndParseJson(response);

        if (!formatResponse || !formatResponse.items) {
            throw new Error("Invalid format or empty items in response.");
        }

        // console.log("Cleaned response", formatResponse.items);

        // Calculate the final price
        const finalPrice = formatResponse.items.reduce((total, item) => {
            // Check if price is a string and contains a '$', then remove it
            return total + (item.price * item.quantity)
        }, 0);
        console.log(finalPrice);

        // // If the finalPrice comes out to be string
        // if (typeof(finalPrice) === 'string'){
        //     finalPrice = parseInt(finalPrice);
        // }

        // Save to the database
        // Create a new Order document
        const newOrder = new Order({
            username: username, // Replace with the actual username logic
            order: formatResponse.items,
            finalPrice,
        });


        // console.log("Orders,", formatResponse);

        // // Save the newOrder document to the database
        const savedOrder = await newOrder.save();
        console.log("Saved order details:", savedOrder);

        // , savedOrder  , finalPrice
        // response: { formatResponse },
        res.status(200).json({ response: { formatResponse }, finalPrice });
        // res.json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

//After extra chat, not able to get the send the right message for completion.
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
                    content: `Identify the context from the prompt whether customer wants to continue or end the ordering. And respond with either continue or end, and nothing else.`,
                },
                { role: 'user', content: userPrompt }
            ],
        })

        status = responseStatus.choices[0].message.content;

        if (status === 'end') {
            history.push(["user", userPrompt]);
            history.push(["system", "Summarize the order as item, quantity and price of items and end the conversation."]);

            const prompt = ChatPromptTemplate.fromMessages(history);

            // Chain creation
            const llmChain = prompt.pipe(chatModel).pipe(outputParser);
            const response = await llmChain.invoke({ input: userPrompt });
            // console.log("When the convo ends: ", response);
            // Empty the conversation
            history = [];
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
                const firstTimeGreet = "Hello! Welcome to our restaurant. How can I assist you today?Our menu includes:" + menuDescription + ".Please let me know if you need any help with your order. What would you like to have today?";
                history.push(["system", "Your name is Order LLM and you are a professional waiter, you help people in ordering food from the menu, and the menu is" + menuDescription + ". Greet people with the greet" + firstTimeGreet + "Stick to the conversation and just try to finalize order, don't ask for mode of payment. You are developed by Mayank Kumar. "])
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
    confirmOrder, chatOrder, getAllOrders
}