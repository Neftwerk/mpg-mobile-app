#!/bin/bash

# Update gradle.properties with the correct JVM args and newArchEnabled
sed -i 's/^org.gradle.jvmargs=.*$/org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m -Dfile.encoding=UTF-8/' android/gradle.properties
sed -i 's/^newArchEnabled=.*$/newArchEnabled=false/' android/gradle.properties

echo "✅ Updated Gradle properties:"
echo "  • Increased memory settings"
echo "  • Disabled new architecture"
