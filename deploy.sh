set -e

APP_NAME=redstorm


PACKAGE_VERSION=$(cat package.json |
    grep version |
    head -1 |
    awk -F: '{ print $2 }' |
    sed 's/[",]//g' |
tr -d '[[:space:]]')


TAG=$PACKAGE_VERSION


PROJECT_ID=$(gcloud config list --format 'value(core.project)' 2>/dev/null)

echo "✅ project: ${PROJECT_ID}, version:${TAG}"

IMAGE="gcr.io/${PROJECT_ID}/${APP_NAME}:${TAG}"

echo "✅ IMAGE: ${IMAGE}"

# gcloud container images describe "$IMAGE" ||
gcloud builds submit --substitutions _PROJECT_ID="${PROJECT_ID}",_APP_NAME=$APP_NAME,_TAG="$TAG" .

echo "✅ Image ${IMAGE} build successfully. Description:"

gcloud container images describe "$IMAGE"