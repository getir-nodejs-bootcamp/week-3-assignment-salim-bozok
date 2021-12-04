# week-3-assignment-salim-bozok

This project is a demonstrational API with Express.js, jwt authentication and logging.

### Installation

Download the source codes to your computer.

```
git clone https://github.com/getir-nodejs-bootcamp/week-3-assignment-salim-bozok.git
```

### Usage

1. Go to project directory

```
cd week-3-assignment-salim-bozok
```

2. Create .env file in the main directory

```
touch .env
```

3. Open .env file with your IDE and edit it as following example

```
PORT=4000
JWT_SECRET=supersecretcode
```

4. Create new user

```
curl --location --request POST 'localhost:4000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password1234"
}'
```

5. Sign in to your account

```
curl --location --request POST 'localhost:4000/users/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "johndoe@example.com",
    "password": "password1234"
}'
```

6. If you want to get user information send this request with jwt token that given to you by the server

```
curl --location --request GET 'localhost:4000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM4NjQxNzQxfQ.lF8_jlzMZFadtnIP0WX844thGZ3PNCLRc7LR-_c8ZVY'
```

7. If you want to play around here are the other endpoints

   a. Update User

   ```
   PATCH /users HTTP/1.1
   Host: localhost:4000
   ```

   b. Delete User

   ```
   DELETE /users HTTP/1.1
   Host: localhost:4000
   ```

8. For seeing the logs that saved by the server go to the log.json file in the root directory
   ![An example of the log.json file](./example_log_file.png)

<br />

© Salim Bozok ([GitHub](https://github.com/nebisin) - [Linkedin](https://www.linkedin.com/in/salimbozok/) - <salimbozok@outlook.com>)
