#!/bin/bash
export PRG="$0"
while [ -h "$PRG" ] ; do
  ls=`ls -ld "$PRG"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG=`dirname "$PRG"`/"$link"
  fi
done
BASEDIR=`dirname "$PRG"`/..
REPO=$BASEDIR/lib
CLASSPATH="$BASEDIR/etc:$REPO/*"
JAVA_MAIN_CLASS=fr.aleclerc.banana.BananaApp
LOGBACK_CONFIG_FILE=$BASEDIR/etc/logback.xml
JAVACMD=$JAVA_HOME/bin/java
JAVA_OPTIONS="-Dfile.encoding=UTF-8"
MEM_OPTIONS="-Xms32m -Xmx300m -Xss256k -XX:+UseCompressedOops"
if [ -d "$JAVA_HOME/bin/java" ] ; then
	exec $JAVACMD -classpath $CLASSPATH $JAVA_OPTIONS --add-modules=java.xml.bind -Dlogging.config=$LOGBACK_CONFIG_FILE $MEM_OPTIONS $JAVA_MAIN_CLASS
else
	java -classpath $CLASSPATH $JAVA_OPTIONS --add-modules=java.xml.bind -Dlogging.config=$LOGBACK_CONFIG_FILE $MEM_OPTIONS $JAVA_MAIN_CLASS
fi