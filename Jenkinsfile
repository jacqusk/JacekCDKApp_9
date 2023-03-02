library (
    identifier: 'nodeModuleBuilder@vPROPOSED',
    retriever: modernSCM(
        [
            $class: 'GitSCMSource',
            credentialsId: "git_read_only",
            remote: "https://git.ellucian.com/scm/enta/jenkins-pipeline-node-module-ca.git"
        ]
    )
)

node("ec2-worker-u18-medium") {
    stage('bootstrap'){
        cleanWs()
        nodeModuleBuilder([
            runUnitTests: false,
            nodeLabel: 'NODE_VERSION_16X_LATEST',
            releaseBranch: 'master',
            publishBranches:['master'],
            publish: true,
            forceSnapShot: false,
            prePublishCmd: 'npx projen cd-release',
            reportJUnitFiles: ['test-reports/junit.xml'],
        ])
    }
}