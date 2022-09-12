## Docker

docker build . -t bitcoin:1.0 \
docker run -p 8080:3000 -d --name crypto -v resources:/Bitcoin/resources <${image_name}>

## Additional Information

The application uses https://www.coinapi.io/ as a third-party library in order to get the BTC price.
