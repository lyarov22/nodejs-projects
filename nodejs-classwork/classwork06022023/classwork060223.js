for (var i = 0; i < 150; i++) {

    console.log('Привет мир!');

  }

  for (let i = 2; i <= 20; i += 2) {

    console.log(i);

  }

function checkArgument(arg) {

   if (arg > 0) {

          console.log("Hello");

    } else {

      console.log("olleH");

    }

  }

checkArgument(-5)

checkArgument(5)

function multiplyTwoNumbers(a, b) {

    const result = a * b;

    const file = new FileWriter("result.txt");

    file.write(result);

    file.close();

  }

  

  multiplyTwoNumbers(2, 3);
