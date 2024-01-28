PACKAGE_JSON_VERSION=refs/tags/v$(cat package.json | jq --raw-output '.version')
if [[ "${PACKAGE_JSON_VERSION}" != "${GITHUB_REF}" ]]
then
  echo -n "error: PACKAGE_JSON_VERSION ${PACKAGE_JSON_VERSION} mismatches "
  echo    "GITHUB_REF ${GITHUB_REF}"
  exit 1
fi
PACKAGE_LOCK_JSON_VERSION=refs/tags/v$(cat package-lock.json | jq --raw-output '.version')
if [[ "${PACKAGE_LOCK_JSON_VERSION}" != "${GITHUB_REF}" ]]
then
  echo -n "error: PACKAGE_LOCK_JSON_VERSION ${PACKAGE_LOCK_JSON_VERSION} mismatches "
  echo    "GITHUB_REF ${GITHUB_REF}"
  exit 1
fi
