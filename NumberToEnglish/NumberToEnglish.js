
function numberToEnglish(number) {
    if (number < 0) {
        return `negative ${numberToEnglish(-number)}`;
    }
    if (number <= 999) {
        return threeDigitNumberToEnglish(number);
    }

    const numberTiers = [
        '',
        'thousand',
        'million',
        'billion',
        'trillion',
        'quadrillion',
        'quintillion',
        'sextillion',
        'septillion',
        'octillion',

    ];

    const output = [];

    for (let a = getMaxNumTier(number); a > 0; a--) {
        let curr = Math.floor(number / Math.pow(1000, a)) % 1000;
        if (curr === 0) {continue;}
        let res = threeDigitNumberToEnglish(curr);
        output.push(`${res} ${numberTiers[a]}`);
    }
    if (number % 1000 !== 0) {
        output.push(threeDigitNumberToEnglish(number % 1000));
    }

    return output.join(', ');
}

function getMaxNumTier(number) {
    return parseInt((Math.log(number) / Math.log(1000)).toFixed(15))
}

function threeDigitNumberToEnglish(num) {
    nums = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
        'fifteen',
        'sixteen',
        'seventeen',
        'eighteen',
        'nineteen',
    ];
    
    tenTiers = [
        '',
        '',
        'twenty',
        'thirty',
        'fourty',
        'fifty',
        'sixty',
        'seventy',
        'eighty',
        'ninety'
    ];
    
    const hundred = 'hundred';
    if (num >= 1000) {
        throw 'Number too large';
    }
    if (num === 0) {
        return nums[0];
    }
    const output = [];
    if (num >= 100) {
        let hundreds = Math.floor(num / 100);
        output.push(`${nums[hundreds]} ${hundred}`);
    }

    const twoDigit = num % 100;
    if (twoDigit !== 0) {
        if (twoDigit >= 20) {
            let tens = Math.floor(twoDigit / 10);
            let onesPlace = twoDigit % 10;
            if (onesPlace === 0) {
                output.push(`${tenTiers[tens]}`)
            } else {
                output.push(`${tenTiers[tens]}-${nums[onesPlace]}`)
            }
        } else if (twoDigit !== 0) {
            output.push(`${nums[twoDigit]}`)
        } 
    }
    return output.join(' ');
}

// threeDigitNumberToEnglish(0, true);
// threeDigitNumberToEnglish(0, false);
// threeDigitNumberToEnglish(4, false);
// threeDigitNumberToEnglish(8, false);
// threeDigitNumberToEnglish(10, false);
// threeDigitNumberToEnglish(11, false);
// threeDigitNumberToEnglish(13, false);
// threeDigitNumberToEnglish(17, false);
// threeDigitNumberToEnglish(20, false);
// threeDigitNumberToEnglish(21, false);
// threeDigitNumberToEnglish(33, false);
// threeDigitNumberToEnglish(55, false);
// threeDigitNumberToEnglish(81, false);
// threeDigitNumberToEnglish(90, false);
// threeDigitNumberToEnglish(70, false);

// threeDigitNumberToEnglish(100, false);
// threeDigitNumberToEnglish(200, false);
// threeDigitNumberToEnglish(900, false);
// threeDigitNumberToEnglish(901, false);
// threeDigitNumberToEnglish(911, false);
// threeDigitNumberToEnglish(920, false);
// threeDigitNumberToEnglish(924, false);
// threeDigitNumberToEnglish(999, false);

console.log(numberToEnglish(-100000123456000360024010));

// precache zero - one hundred?
// what values to hard-code? which to concatenate from others
    // missing eighteen + eighty
// float precision 


