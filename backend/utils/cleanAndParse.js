function cleanAndParseJson(responseString) {
    // Step 1: Strip extraneous characters
    // This removes ```json and ``` if they exist, as well as leading/trailing whitespace
    const cleanString = responseString.replace(/```json|```/g, '').trim();

    // Step 2: Parse the JSON string into an object
    try {
        const jsonObject = JSON.parse(cleanString);
        return jsonObject;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null; // or handle the error as appropriate for your application
    }
}

module.exports = cleanAndParseJson;