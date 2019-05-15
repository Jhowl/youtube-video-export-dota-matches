# Credentials format

## Algorithmia

File: `google-api.json`

```
{ "web":
    {
    "client_id":"aaaaaaaaaaaaaaaaaaaaaaaaa",
    "project_id":"aaaaaaaaaa",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"aaaaaaaaaaaaaa",
    "redirect_uris":["http://localhost:5000/oauth2callback"],
    "javascript_origins":["http://localhost:5000"]
    }
}
```