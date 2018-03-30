#curl -X POST "http://localhost:3000/accounts" -d '{"name":"Jorge","balance":100.2328732}' -H "Content-Type:application/json" -i
#curl -X PUT "http://localhost:3000/accounts" -d '{"_id":"5abeb99f1143f638b8bfda2f","name":"Jorge Antonio González Suárez","balance":100.2328732}' -H "Content-Type:application/json" -i
curl -X DELETE "http://localhost:3000/accounts/5abeb99f1143f638b8bfda2f"  -i