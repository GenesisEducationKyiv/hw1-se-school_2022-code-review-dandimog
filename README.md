## Docker

docker build . -t bitcoin:1.0 \
docker run -p 8080:3000 -d --name crypto -v resources:/Bitcoin/resources <${image_name}>

## Additional Information
The application has several options of third-party libraries you can use to choose from in order to get the Bitcoin rate.
 - https://api.binance.com
 - https://www.coinapi.io/
 - https://api.coingecko.com
 - https://pro-api.coinmarketcap.com

## UML Diagram of Chain of Responsability patterns implementation

![Chain of Responsability](src/resources//images/Chain%20of%20Responsibility%20UML.jpg)
