#!/bin/bash

set -x
echo ********************
echo *       Banana     *
echo ********************
cd ..
PRG="$0"
while [ -h "$PRG" ] ; do
  ls=`ls -ld "$PRG"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG=`dirname "$PRG"`/"$link"
  fi
done
BASEDIR=`dirname "$PRG"`
REPO=$BASEDIR/lib
CLASSPATH="$BASEDIR/etc:$REPO/*"
JAVA_MAIN_CLASS=fr.aleclerc.banana.BananaApp
LOGBACK_CONFIG_FILE=$BASEDIR/etc/logback.xml
JAVACMD=$JAVA_HOME/bin/java
JAVA_OPTIONS="-Dfile.encoding=UTF-8"
MEM_OPTIONS="-Xms1024m -Xmx1024m"
java  -classpath $CLASSPATH $JAVA_OPTIONS -Dlogging.config=$LOGBACK_CONFIG_FILE $MEM_OPTIONS $JAVA_MAIN_CLASS

