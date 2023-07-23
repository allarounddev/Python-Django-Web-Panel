#!/usr/bin/env bash
# exit on error
set -o errexit

python -m pip install --upgrade pip

pip install -r "requirements.txt"
pip install -U polygon-api-client

python manage.py collectstatic --no-input
python manage.py migrate
