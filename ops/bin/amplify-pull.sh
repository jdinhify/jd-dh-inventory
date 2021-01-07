#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"accessKeyId\":\"${AWS_ACCESS_KEY_ID}\",\
\"secretAccessKey\":\"${AWS_SECRET_ACCESS_KEY}\",\
\"region\":\"${AWS_REGION}\"\
}"
AMPLIFY="{\
\"projectName\":\"jd-dh-inventory\",\
\"appId\":\"${AWS_APP_ID}\",\
\"envName\":\"${AWS_APP_ENV_NAME}\",\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":${REACTCONFIG}\
}"
PROVIDERS="{\
\"awscloudformation\":${AWSCLOUDFORMATIONCONFIG}\
}"
AUTHCONFIG="{\
\"googleAppIdUserPool\":\"${AMPLIFY_GOOGLE_CLIENT_ID}\",\
\"googleAppSecretUserPool\":\"${AMPLIFY_GOOGLE_CLIENT_SECRET}\"\
}"
CATEGORIES="{\
\"auth\":${AUTHCONFIG}\
}"

amplify pull \
--amplify ${AMPLIFY} \
--frontend ${FRONTEND} \
--providers ${PROVIDERS} \
--categories ${CATEGORIES} \
--yes
