package hello

import (
	"net/http"
	"log"
	"fmt"
)

func hello() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello World")
	})

    log.Println("Listening on 8080")
	http.ListenAndServe(":8080", nil)
}
