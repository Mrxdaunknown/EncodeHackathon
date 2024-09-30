# Neo X Grind Hackathon Encode Club Edition
This project was created during the Neo X Grind Hackathon Encode Club Edition 2024.

**What is the project about / What was created?**

This project showcases my created Javascript plugin "Metamask_Init" for the Neo X Grind Hackathon 2024 (Encode Club Edition).

I have created a MetaMask integration plugin for the popular game development software RPG Maker MV.

It allows players to **connect a MetaMask wallet to a browser-deployed RPG**. Additionally, **players can receive gold (ingame currency) in exchange for ERC20-tokens**.

Download Link: https://github.com/Mrxdaunknown/EncodeHackathon/blob/main/js/plugins/Metamask_Init.js

**Playable Demo Links:** 

https://worldofelements.de/

https://worldofelements.itch.io/metamask-login

**In Detail:**

- RPG Maker MV developers can use this plugin to allow players to connect their MetaMask wallet to a browser-deployed game.

- The **player´s wallet address will be stored in a variable** (default variable 1). The stored wallet address could be used for account creation or something else.

- As mentioned before, players can receive ingame gold in exchange for ERC20-tokens. For this reason, developers can change a lot of information in the plugin parameters:
1. The Token Contract Address (the token the developer wants to receive, by default it´s the contract of WGAS10 for the Neo X blockchain)
2. The Recipient Wallet Address (the address to which the tokens should be sent, by default it´s my wallet :) )
3. The Token Amount (the amount a player needs to send to receive the gold amount, by default its 0.1 token)
4. The Gold Amount (the gold amount the player will receive in exchange after a sucessful transaction, by default its 1000 gold)


**Images**

![image](https://github.com/user-attachments/assets/275c05ce-68a7-4b63-8ac5-a76024fb2cb9)

**Possible Questions:**
- Do I need to download anything else?

No, my plugin is making use of a CDN (Content Delivery Network), so it´s dynamically loading the library "Web3" to save space and for better performance. You only need to download the
plugin, save it in your plugins folder and activate in Plugin Manager.

- Is it free for commercial use?

Yes, it´s free for commercial and non-commercial use! No need to give credit, feel free to modify or distribute this plugin.

- Why did you create this plugin?

I noticed that in the RPG Maker MV community a lot of people have been asking about a plugin like this. Furthermore, I´d like to use it for my game "World of Elements" which currently
does not have MetaMask integration, it´s currently Neo N3 blockchain only.
