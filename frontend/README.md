# Order LLM front-end
- The front-end is made using <a href="https://www.typescriptlang.org/docs/handbook/react.html">React TypeScript </a> (Vite), <a href="https://tailwindcss.com/">Tailwind CSS</a> and <a href="https://console.firebase.google.com/">Firebase</a> on front-end. I have taken inspiration for UI from <a href="https://dribbble.com/">Dribble</a>, and also I drew my flows and rough UI ideas on <a href="https://excalidraw.com/">Excalidraw</a>. I also learned some UI/UX concepts for applying it in my project, specifically 60-30-10 rule, for base color, primary color, and secondary color which is quite logical to use to create a effective UI.

- Followed simple folder structure of /Components file with common components and /Pages with all the pages to show.
- Future plan is to implement Redux and move all the API services in a single folder to use DRY concept.

## Pages present in the App
A description about UI with images and little details for you, the reader to go through the project quickly.

### 1. Landing Page
The landing page is focused to deliver some idea and working before entering the project.
![image](https://github.com/mank-423/orderLLM/assets/96490105/ad2d882d-4f3f-4359-92ec-32fe386030ab)
![image](https://github.com/mank-423/orderLLM/assets/96490105/2acef916-cc76-4bff-9683-202c64abacbc)
![image](https://github.com/mank-423/orderLLM/assets/96490105/dc1572eb-da40-48df-a77c-a8394f66e431)

### 2. Login
Using mix of Firebase + MongoDB, simplifying the login to one-click,
![image](https://github.com/mank-423/orderLLM/assets/96490105/0707b805-b20e-4352-a9a3-0566e4e02230)

Mobile responsive view:<br/>
![image](https://github.com/mank-423/orderLLM/assets/96490105/d22584da-0cbc-4a34-9064-b7b05aff9816)


### 3. Chat section
This is where the magic ✨ happens, here you can chat with the bot, which is made using <a href="https://js.langchain.com/docs/get_started/introduction">Langchain</a>, React (Typescript) Vite setup. Here the dropdown consists of all the orders made by the customer, and the customer profile, alongwith the section to chat.
<br />
![image](https://github.com/mank-423/orderLLM/assets/96490105/eea401c6-4567-4d62-b179-9b48f4acbdd9)
Mobile responsive view:<br/>
![image](https://github.com/mank-423/orderLLM/assets/96490105/87c8b059-0e4a-4c19-af18-14db0e7dbab6)

- Chats example
![Screenshot 2024-03-08 131350](https://github.com/mank-423/orderLLM/assets/96490105/4ff6581b-4be2-49e7-9e3a-6b1890ddc9b3)
*This one was taken during development, the responses are better now 🤞

### 4. Admin Panel
The idea is to has this service can change, add or delete the menu, and have the analytics here. For now just processing basic details on the admin page.
![image](https://github.com/mank-423/orderLLM/assets/96490105/a8f32a5c-cb19-4279-96cd-aca875123f48)
