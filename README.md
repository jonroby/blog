### dev
    `go run dev/main.go`
    `dev_appserver.py ./app_engine/`

### prod
    `gcloud app deploy`

### delete
    `gcloud app versions delete`

### list
    `gcloud app versions list`

### connect to database
    `gcloud sql connect myinstance --user=postgres`

### connect to gcloud
    `gcloud auth login`
    `gcloud auth application-default login`
    `./cloud_sql_proxy -instances=<INSTANCE_NAME>=tcp:5432`
