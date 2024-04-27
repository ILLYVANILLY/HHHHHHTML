let cooki = 0
numbaofcooki.innerHTML = 'you have COOKED ' + cooki + ' number of flappycooki.';

function checkLoging() { //the login system... I actually need to encrypt this somehow

    var entusername = document.getElementById('usernamee').value;
    var entpassword = document.getElementById('passwordd').value;
    var loginStatoos = document.getElementById('loginStatoos');

    async function fetchUserData() {
        try {
            const response = await fetch('dettextfile.txt');
            const text = await response.text();
            const lines = text.split('\n').map(line => line.split('.'));
            // Process the lines to extract user data
            return lines;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return [];
        }
    }

    // Assuming thisbigthing is a promise returned by fetchUserData()
    const thisbigthing = fetchUserData();

    // Handle the promise asynchronously
    thisbigthing.then(userData => {
        // userData is the array containing user data
        // Loop through userData
        userData.forEach(user => {
            // Each user is an array containing username, password, and skin
            const useername = user[0].split(',');
            const passsword = user[1].split(',');
            let username = useername[1];
            let password = passsword[1];

            if (entusername == username && entpassword == password) {
                
                loginStatoos.innerHTML = 'Login successful!';

                
                const cookii = user[3].split(', ');
                cooki = Number(cookii[1]);
                //window.location.href = 'flappybirb.html';
            }
            
            // Do something with each user data
            //console.log(`Username: ${username}, Password: ${password}, Skin: ${skin}`);
        });
    }).catch(error => {
        // Handle errors if the promise is rejected
        console.error('Error fetching user data:', error);
    });


    //SCrapALLTHAT

}
