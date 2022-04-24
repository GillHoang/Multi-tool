# Id discord 
-  [PC/laptop](https://www.youtube.com/watch?v=NLWtSHWKbAI)
-  [Mobile](https://www.youtube.com/shorts/aAIefS7DO3g)
## Id Application for RichPresence 
1. Got to [Discord Developer Portal](https://discord.com/developers/applications).
2. Then create a application in the top right corner next to your avatar.
3. You can write whatever name you want in the name box. Then click `create`
4. Then you find the Rich Presence section on the left, click `Art Assets`
5. Add photos you like to the add images button below, 2 photos are required
6. Then go back to `General Information`, find the `APPLICATION ID` entry and copy paste it into `RP_ApplicationId` in `config/statusConfig.json` 
7. Run app.js to get the id of 2 pictures and the name to determine which is the big one and which one is the small one
8. Paste the large image id into `RP_AssetsLargeImage`, the small image id into `RP_AssetsSmallImage`
9. Done.
## Id emoji
- For Unicode emoji, you just need to get the unicode emoji you like then add `\` in -front of the emoji to get the standard emoji then paste it into `CS_UnicodeIcon`

- For custom emoji, you just need to get the emoji you like then add `\` in front of the emoji to get the standard emoji then it will output the format `<:name:id> `, name is put in `CS_NameCustomEmoji`, id put in `CS_IdCustomEmoji`, if emoji is animated then set it to `true` otherwise false