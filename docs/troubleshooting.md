[Back to main](../README.md)

## ❤️‍🩹 Troubleshooting

### Container crashes because it does not have proper file access rights

1. Find out the user ID by running `docker exec -it --user portfolio <container_id> id` or `docker run -it --user portfolio <container_id> id`
2. Give rights to the file `chown <user_id> <path_to_file>`
