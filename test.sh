# shellcheck disable=SC2164
cd server2

echo ">> grant permission"
chmod +x gradlew

echo ">> project clean Build Start"
./gradlew clean build

echo ">> pwd"
pwd

echo ">> go jar"
cd ./build/libs

JAR_NAME=$(ls|grep '0.0.1' | tail -n 1)
echo "jar name : $JAR_NAME" /dev/null 2>&1