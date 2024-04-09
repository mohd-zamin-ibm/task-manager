# Task Manager

> A small backend project to manager tasks.

## Project setup

```
npm install
```

## Run the Vue dev server (http://localhost:3000)

```
npm run start
```

## Compiles and minifies for production

```
npm run build
```

### API List

### Register as a new User
```
http://localhost:3000/api/register/
Method: POST
Body:
{
  "name": "Zamin",
  "email": "mohd.zamin+6@ibm.com",
  "password": "random@U1"
}
```
### Login
```
http://localhost:3000/api/login/
Method: POST
Body:
{
  "email": "mohd.zamin+6@ibm.com",
  "password": "random@U1"
}
```

### Get List of All Tasks
```
http://localhost:3000/api/tasks/:id
Method: Get
header: {
  auth-token: 'token'
}
```
### Add a new Task
```
http;//localhost:3000/api/tasks/
Method: POST
header: {
  auth-token: 'token'
}
Body: {
  title: '',
  description: '',
  dueDate: '',
  isCompleted: false,
  createdBy: User.id
}
```

### Edit a task
```
http;//localhost:3000/api/tasks/:id
Method: PUT
header: {
  auth-token: 'token'
}
Body: {
  title: '',
  description: '',
  dueDate: '',
  isCompleted: false,
  createdBy: User.id
}
```
### Delete a task
```
http;//localhost:3000/api/tasks/:id
Method: DELETE
header: {
  auth-token: 'token'
}
```
