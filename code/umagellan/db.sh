#!/bin/bash

PYTHON=$(which python)

if [ $(which python2) ]; then
  PYTHON=$(which python2);
fi;

rm umagellan.db
rm -rf UMagellan/migrations/

$PYTHON manage.py syncdb
$PYTHON manage.py schemamigration UMagellan --initial
$PYTHON manage.py migrate UMagellan

