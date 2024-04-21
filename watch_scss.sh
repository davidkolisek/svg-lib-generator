#!/usr/bin/env bash
### sem vlozit cesty k scss:css suborom

watchScss="src/assets/scss/main.scss:src/assets/css/main.css"

echo "Watcher spusteny:"

sass --watch $watchScss --style compressed
