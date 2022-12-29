# shellcheck disable=SC2164
cd server2

echo ">> grant permission"
chmod +x gradlew

echo ">> project clean Build Start"
./gradlew clean build

echo ">> pwd"
pwd

cd /home/ubuntu

echo ">> go jar"
cp build/libs/*.jar jenkins/
