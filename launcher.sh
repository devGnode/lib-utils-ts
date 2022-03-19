#!/bin/sh

# Runner File
RUNNER=src/Run.ts

# ENV
export PROJECT_ROOT=$PWD
export PROJECT_SRC=$PWD/src
export PROJECT_RESOURCES=$PWD/src/resources
export PROJECT_CLASS_MAIN=test.Run

#
ts-node $RUNNER --main=$PROJECT_CLASS_MAIN --arguments="-Dprod"