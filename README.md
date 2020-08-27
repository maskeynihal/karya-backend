# Karya Backend

## Installation

1. git clone <https://github.com/maskeynihal/karya-backend.git>
2. yarn install
3. cp `.env.example` `.env`

4. ```bash
    $ node
    > require('crypto').randomBytes(64).toString('hex')
      'some random string'
5. Copy the string generated and past  in `ACCESS_TOKEN_SECRET` of `.env` file
6. Add database credentials in `.env`
7. yarn migrate
8. yarn seed
9. yarn start
