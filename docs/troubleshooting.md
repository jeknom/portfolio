[Back to main](../README.md)

## Troubleshooting

### Production container crash because the container does not have permissions to access certificates

You will need to provide file access for the container.

1. Find out the user ID by running `docker exec -it --user portfolio <container_id> id` or `docker run -it --user portfolio <container_id> id`
2. Give rights to the file `chown <user_id> <path_to_file>`
