@echo off

TITLE Banana

set BASEDIR=%~dp0\..

set REPO=%BASEDIR%\lib

set CLASSPATH="%BASEDIR%"\etc;"%REPO%"\*

set JAVA_MAIN_CLASS=fr.aleclerc.banana.BananaApp

set LOGBACK_CONFIG_FILE="%BASEDIR%/etc/"logback.xml

set JAVACMD=%JAVA_HOME%/bin/java.exe

set JAVA_OPTIONS=-Dfile.encoding=UTF-8

set MEM_OPTIONS=-Xms450m -Xmx450m

"%JAVACMD%" -classpath  %CLASSPATH% %JAVA_OPTIONS% --add-modules=java.xml.bind -Dlogging.config=%LOGBACK_CONFIG_FILE% %MEM_OPTIONS% %JAVA_MAIN_CLASS%
