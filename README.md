# shiori
A Fun and Wholesome Discord Bot!

`shiori` is a Discord bot that can bring fun to your server(s). Currently still in development.

## Setting Up
If you want to try `shiori`, you need to run it by yourself since it's still not production-ready. You can run it by following the below steps.

1. Make sure you have Node `>=10.0.0` installed.
2. Make sure you already have a Discord bot token. You can get one in [Discord Developer](https://discord.com/developers/applications)
3. Create a [FaunaDB](https://fauna.com/) database. You can do it in [their site](https://fauna.com/) and get the database token.
4. Clone this repository by running the following command:
```sh
git clone https://github.com/ShioriLabs/shiori
```
5. Go to the cloned folder and install all the dependencies by running the following command:
```sh
cd shiori
npm install
```
6. Put your Discord token and FaunaDB token in `.env.example` and then remove the `.example` extension
7. Start it by running
```sh
npm start
```
8. Invite your bot by the link in the OAuth2 page of your Discord Developers application page (usually it's in https://discord.com/developers/applications/[app-id]/oauth2)
9. Have fun!