# shiori
A Fun and Wholesome Discord Bot!

`shiori` is a Discord bot that can bring fun to your server(s). Currently still in development.

## Setting Up
If you want to try `shiori`, you need to run it by yourself since it's still not production-ready. You can run it by following the steps.

### Prerequisites
1. Get a Discord bot token. You can get one in [Discord Developers Page](https://discord.com/developers/applications)
2. Get a Fauna database. You can do it in [their site](https://fauna.com/) and get the database token.

### Install with Docker
Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed

1. Create a folder somewhere at your system and change to that folder. e.g.:
    ```sh
    mkdir shiori
    cd shiori
    ```

2. Create a `docker-compose.yml` and fill with the following content:
    ```yml
    version: "3.3"
    services:
      shiori:
        container_name: shiori
        image: ghcr.io/shiorilabs/shiori:latest
        env_file: ./.env
    ```
    Or, just download it from [this repository's `docker-compose.yml`](https://github.com/ShioriLabs/shiori/blob/master/docker-compose.yml)

3. Create an `.env` file and fill it with your Discord token and Fauna token. Examples are in [this following file](https://github.com/ShioriLabs/shiori/blob/master/.env.example)

4. Start it with Docker Compose
    ```sh
    docker-compose up
    ```

### Install with Node
Make sure you have Node `>=14.16.0` installed.

1. Clone this repository by running the following command:
    ```sh
    git clone https://github.com/ShioriLabs/shiori
    ```
2. Go to the cloned folder and install all the dependencies by running the following command:
    ```sh
    cd shiori
    npm install
    ```
3. Put your Discord token and FaunaDB token in `.env.example` and then remove the `.example` extension
4. Start it by running
    ```sh
    npm start
    ```

## Inviting to Your Server(s)
1. Invite the bot by the link in the OAuth2 page of your Discord Developers application page (usually it's in https://discord.com/developers/applications/[your-bot-app-id]/oauth2)
2. Have fun!

## License
MIT [(See License)](https://github.com/ShioriLabs/shiori/blob/master/LICENSE)
