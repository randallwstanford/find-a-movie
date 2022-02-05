package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}
	return port
}

func formHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	movieTitle := r.FormValue("movieTitle")

	fmt.Fprintf(w, "Movie Title = %s\n", movieTitle)

	url := "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/" + movieTitle

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("x-rapidapi-host", "imdb-internet-movie-database-unofficial.p.rapidapi.com")
	req.Header.Add("x-rapidapi-key", "c961afde0bmsh919ccbd34b5ebb3p13f56ajsnc1d975d8de37")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(string(body))
	fmt.Fprintf(w, string(body))

}

func main() {
	http.HandleFunc("/form", formHandler)

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	port := getPort()

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); err != nil {
		log.Fatal("Failed starting http server: ", err)
	}

}
