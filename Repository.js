import fs from 'fs';

export function addMail(requestBody, res) {

    fs.readFile('resources/database.json', (err, body) => {

        if (err) return res.status(500).send('');

        try {
            var database = JSON.parse(body);
            if (validateEmail(requestBody.email)) {
                return res.status(400).send('The provided email do not match the email pattern. Please provide the valid email.');
            } else if (database.emails.includes(requestBody.email)) {
                return res.status(409).send('The provided user is already in a database.');
            } else {
                database.emails.push(requestBody.email);
                let updatedDatabase = JSON.stringify(database, null, 2)
                fs.writeFileSync('resources/database.json', updatedDatabase);
            }
        } catch (e) {
            return res.status(500).send(JSON.stringify(e));
        }
        res.status(200).send('');
     });

}

export function fetchMails() {
    return new Promise((resolve, reject) => {
        fs.readFile('resources/database.json', (err, body) => {
            if (err) return reject(err)
            try { resolve(JSON.parse(body)) } 
            catch (e) { reject(e) }
        });
    });
}

function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  } 
