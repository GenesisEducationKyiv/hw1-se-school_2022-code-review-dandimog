import fs from 'fs';

export function addMail(requestBody, res) {

    fs.readFile('resources/database.json', (err, body) => {

        if (err) return res.status(500).send('');

        try {

            var database = JSON.parse(body);
            if (!database.emails.includes(requestBody.email)) {
                database.emails.push(requestBody.email);
                let updatedDatabase = JSON.stringify(database, null, 2)
                fs.writeFileSync('resources/database.json', updatedDatabase);
            } else {
                return res.status(409).send('The provided user is already exist');
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
