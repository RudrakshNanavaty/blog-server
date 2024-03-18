#!/bin/bash

# Define the endpoint URL
URL="https://localhost/auth/signup"

# Define the user data for 10 users
USER_DATA=(
    "username=John&email=john@example.com&password=pass123"
    "username=Alice&email=alice@example.com&password=pass456"
    "username=Bob&email=bob@example.com&password=pass789"
    "username=Emily&email=emily@example.com&password=pass101112"
    "username=Michael&email=michael@example.com&password=pass131415"
    "username=Sara&email=sara@example.com&password=pass161718"
    "username=David&email=david@example.com&password=pass192021"
    "username=Jessica&email=jessica@example.com&password=pass222324"
    "username=Daniel&email=daniel@example.com&password=pass252627"
    "username=Sarah&email=sarah@example.com&password=pass282930"
)

# Loop through each user data and send curl requests
for ((i=0; i<${#USER_DATA[@]}; i++)); do
    echo "Sending request ${i+1}/${#USER_DATA[@]}..."
    curl --insecure -X POST -d "${USER_DATA[i]}" -H "Content-Type: application/x-www-form-urlencoded" $URL
    echo -e "\n"
done
