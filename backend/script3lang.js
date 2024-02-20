const { config } = require("dotenv");
const { ChatPromptTemplate } = require('@langchain/core/prompts');
const { ChatOpenAI } = require('@langchain/openai');
const { StringOutputParser } = require('@langchain/core/output_parsers');

config();

const outputParser = new StringOutputParser();

const menuItems = [
    { name: "Pizza", description: "A delicious cheese pizza", price: "$10" },
    { name: "Burger", description: "Juicy beef burger with lettuce and tomato", price: "$8" },
    { name: "Salad", description: "Fresh garden salad with your choice of dressing", price: "$7" }
];

const menuDescription = menuItems.map(item => `- ${item.name}: ${item.description} for ${item.price}`).join("\n");

// Initialize state
let userHasInteracted = false;

// Instance of chat model
const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_KEY,
});

const handleChatOrder = async (userPrompt) => {
    try {
        let initialPrompt = "Hello! Welcome to our restaurant. How can I assist you today?\n\nOur menu includes:\n" + menuDescription + "\n\nPlease let me know if you need any help with your order. What would you like to have today?";

        // Adjust the prompt based on whether the user has already interacted
        const systemPrompt = userHasInteracted ? "" : initialPrompt;
        userHasInteracted = true; // Update state to reflect interaction

        // Create dynamic prompt based on user interaction
        const prompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["user", userPrompt],
        ]);

        // Chain creation
        const llmChain = prompt.pipe(chatModel).pipe(outputParser);
        const response = await llmChain.invoke({ input: userPrompt });
        
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

// Example usage - simulate the first user interaction
handleChatOrder("Can I get a pizza?");
// Subsequent call to handleChatOrder should not include the initial welcome message
