FROM eclipse-temurin:17
RUN apt update
RUN apt install wget
RUN wget https://github.com/wildfly/wildfly/releases/download/26.1.0.Final/wildfly-preview-26.1.0.Final.tar.gz
RUN mkdir "/opt/jboss"
RUN tar -xvzf wildfly-preview-26.1.0.Final.tar.gz -C /opt/jboss/
COPY target/LABA3-1.0-SNAPSHOT.war /opt/jboss/wildfly-preview-26.1.0.Final/standalone/deployments

ENTRYPOINT ["sh", "/opt/jboss/wildfly-preview-26.1.0.Final/bin/standalone.sh" ]