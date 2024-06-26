package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) domReady(ctx context.Context) {
	runtime.WindowCenter(a.ctx)
}

func (a *App) FindApplications(input string) []string {
	if len(input) == 0 {
		return []string{}
	}
	return []string{"Gnome Terminal", "Example application #1", "Example application #2", "Example application #3", "Example application #4"}
}
