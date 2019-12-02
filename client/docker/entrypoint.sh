#!/bin/bash
    echo "Install/Reinstall packages, this will take pretty long, you should get a coffee!"
    npm install -g npm-reinstall
    reinstall -g

exec "$@";
