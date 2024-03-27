FROM quay.io/wildfly/wildfly
COPY target/LABA3-1.0-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments
