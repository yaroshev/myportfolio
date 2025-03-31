#!/bin/bash
rm -rf dist
tsc --noEmit
vite build
