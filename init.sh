mkdir -p $1
echo "\nfunction $1(){}" > $1/$1.js
code $1/$1.js
