package main

import (
	"fmt"
	"io/fs"
	"log"
	"os"
	"strings"
)

type Application struct {
	Name string `json:"name"`
	Path string `json:"path"`
	Exec string `json:"exec"`
}

var desktopFileDirs []string = []string{"/home/zilq/.local/share/applications", "/usr/share/applications"}
var appFileExtension string = ".desktop"

var apps []Application

func FindApps(input string) []Application {
	foundApps := []Application{}

	if apps == nil || len(apps) == 0 {
		return foundApps
	}

	for _, app := range apps {
		if strings.Contains(app.Name, input) {
			foundApps = append(foundApps, app)
		}
	}

	fmt.Printf("Found %d apps\n", len(foundApps))
	if len(foundApps) > 0 {
		fmt.Printf("First app name: %s\n", foundApps[0].Name)
	}

	return foundApps
}

func Init() {
	paths := getAppPaths()
	apps = getApplications(paths)
}

func getAppPaths() []string {
	paths := []string{}
	for _, dir := range desktopFileDirs {
		fileSystem := os.DirFS(dir)
		fs.WalkDir(fileSystem, ".", func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				log.Fatal(err)
			}

			if !strings.HasSuffix(path, appFileExtension) {
				return nil
			}

			fmt.Println(dir + "/" + path)
			paths = append(paths, dir+"/"+path)
			return nil
		})
	}

	return paths
}

func getApplications(paths []string) []Application {
	foundApps := []Application{}
	for _, path := range paths {
		data, err := os.ReadFile(path)
		if err != nil {
			continue
		}

		foundApps = append(foundApps, getApplicationData(path, data))
	}

	return foundApps
}

func getApplicationData(path string, data []byte) Application {
	app := Application{Path: path}

	lines := strings.Split(string(data), "\n")
	for _, line := range lines {
		if len(line) == 0 || !strings.Contains(line, "=") {
			continue
		}

		keyVal := strings.Split(line, "=")

		if keyVal[0] == "Exec" {
			app.Exec = keyVal[1]
		}

		if keyVal[0] == "Name" {
			app.Name = keyVal[1]
		}
	}

	return app
}
