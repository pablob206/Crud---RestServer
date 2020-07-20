# Crud Node RestServer
crud con express mas mongoDB. Entorno desarrollo en http://localhost:3000 y produccion en https://rocky-bayou-67034.herokuapp.com

```
node server/server (entorno desarrollo)
Usar POSTMAN! ej: 
GET: url/user?limite=100&desde=0 / (none)
POST: url/user (name, email, password, role, status, google) / (urlencoded)
PUT: url/user/'id' / (urlencoded)
Delete: url/user/'id' / (none) "cambia el status a false"
```

### Nota:
Para utilizar este restserver en localhost, no olvide reconstruir los modulos de node.
Sino funciona la url de produccion, entonces seguramente he bajado la app para ocuparlo en otro proyecto.

```
npm install
```