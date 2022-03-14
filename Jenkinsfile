def COLOR_MAP = [
'SUCCESS': 'good',
'FAILURE': 'danger',
]
pipeline {
    agent any
    stages {
        stage('Git Clone'){
      steps {
        script {
                    echo("${env.GIT_BRANCH}")

                    }
                  }
                }
    stage("Maven Build"){
      environment {
            mavenHome =  tool name: "maven-3.8.1", type: "maven"
            mavenCMD = "${mavenHome}/bin/mvn"
        }

      steps {
               sh "${mavenCMD} package -Pprod"
               // sh "${mavenCMD} spring-boot:run"
               sh "cp target/SmartContentCreator.war  /home/ubuntu/apache-tomcat-9.0.59/webapps/"

          }
      }
    }

 }
