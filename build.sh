#!/bin/sh
mkdir dist && cp -r docs/* dist && cd dist
gitbook build
