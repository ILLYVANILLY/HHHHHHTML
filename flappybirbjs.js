//great... now what have I done

let move_speed = 3, gravity = 0.5; //move speed is 3 and gravite is 0.5
let viroose_move_speed = 0.7 //viroose moves @ this speef
let birb = document.querySelector('.birb'); //birb sprite
let img = document.getElementById('birb'); //birb imaeg

let birb_props = birb.getBoundingClientRect(); //bird dimensioons/bounds
let many_pill_props = []; // the pill dimensions/bounds. don't ask

//GLOB FUNCTION
function movePills() {
    let pilloe = document.querySelectorAll('.pill');
    many_pill_props = [];
    pilloe.forEach((element) => {
        let pill_props = element.getBoundingClientRect();
        many_pill_props.push(pill_props)

        // Remove the pill when it goes out of the screen
        if (pill_props.right <= 0) {
            element.remove();
        }
        else {
            element.style.left = pill_props.left - 5 + 'px';
            requestAnimationFrame(movePills);
        }
    });
}

let lastAnimationFrameTime = 0; //how much passed since last frame
const fpsInterval = 1000 / 100; // [200] frames per second

let virooseimaeg = document.getElementById('viroose'); //viroose image

let background = document.querySelector('.background').getBoundingClientRect(); //background dimensions/bounds

let score_val = document.querySelector('.score_val'); //the score value
let message = document.querySelector('.message'); //the popup message
let score_title = document.querySelector('.score_title'); //the text indicating this is teh score

let game_state = 'Start'; //state pf the game... what did you expect
img.style.display = 'none'; //is bieb visible
message.classList.add('messageStyle'); //add the message to the purple rectangle

let viroose; //the virooses
let virooseHealth = 5; //the viroose healthpoint. if it reaches 0 it dies

function checkLogin() { //the login system... I actually need to encrypt this somehow
    var username = document.getElementById('username').value; //the username input
    var password = document.getElementById('password').value; //the password input
    var loginStatus = document.getElementById('loginStatus'); //did you log in?

    // Add your authentication logic here - same logic for all of them
    if (username === 'ThePoop3000' && password === 'Bird-Book-Poop') { //if Preston enters his usename and password right
        loginStatus.innerHTML = 'Login successful!'; //the code tells him so, but the message falls on blind eyes(you can't see it... what's the point then?)
        //window.location.href = 'flappybirb.html';
        watters(); //starts the actual game code
    }
    else if (username === 'Rupert_east' && password === '102030123') { //Richard
        loginStatus.innerHTML = 'Login successful!';
        //window.location.href = 'flappybirb.html';
        watters();
    }
    else if (username === 'Chips' && password === 'S124') { //Kieran
        loginStatus.innerHTML = 'Login successful!';
        //window.location.href = 'flappybirb.html';
        watters();
    }
    else if (username === 'Iganjali' && password === '1ZX5') { //Iliya
        loginStatus.innerHTML = 'Login successful!';
        //window.location.href = 'flappybirb.html';
        watters();
    }
    else if (username === 'FATCAT' && password === 'CHONKYCAT') { //Angela
        loginStatus.innerHTML = 'Login successful!';
        //window.location.href = 'flappybirb.html';
        watters();
    }
    else if (username === 'R(i)J' && password === 'RiJy') { //RJ
        loginStatus.innerHTML = 'Login successful!';
        //window.location.href = 'flappybirb.html';
        watters();
    }
    else { //wat ifb the username and password are incorrect combination
        loginStatus.innerHTML = 'Invalid username or password'; // it tells them so. shoves it in their face.
    }
}

function watters() { //actual game code! how far have we come
    message.innerHTML = '<p>Enter to start flappycat!!! <p><span style = "color:wheat">&uarr;</span>uparrow to control cat</p>'; //the starting message
    message.classList.add('messageStyle'); //add that to purple rectangle
    document.addEventListener('keydown', (e) => { //you get an event listener, you name it e, and you get it tolisten to key presses
        if (e.key == 'Enter' && game_state != 'Play') { //if the key input is enter and the game is not playing then
            document.querySelectorAll('.pipe_sprite').forEach((e) => { //for each pipe
                e.remove(); //remove it
            })
            img.style.display = 'block'; //show the birb
            birb.style.top = '40vh'; //birb y location
            game_state = 'Play'; //game is playing
            message.innerHTML = ''; //remove the message
            score_title.innerHTML = 'Score : '; //text indicating this is the score
            score_val.innerHTML = '0'; //the score back at 0.
            message.classList.remove('messageStyle'); // remove the purple rectangle
            play(); //start playing!
        }
    })
}

function play() { //the play function

    let birb_dy = 0; //apply ravity
    let pipe_seperation = 0; // that gap between pipes(horizontal)
    let pipe_gap = 35; // that gap between each pair of pipes

    document.addEventListener('keydown', e => { //you get an event listener, you name it e, and you get it tolisten to key presses
        if (e.key == 'ArrowUp' || e.key == ' ') { //if the key is arrowup or space(hehe) then
            img.src = 'flappingcat.png'; //birb turns into flapping birb. don't ask.
            birb_dy = -7.6; //gravity is negative to birb flies up.
        }
    });

    document.addEventListener('keyup', (e) => { //you get an event listener, you name it e, and you get it tolisten to key releases
        if (e.key == 'ArrowUp' || e.key == ' ') { // if the key released is arrowup or space(hehe) then
            img.src = 'flappycat.png'; //revert back to normie birb
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            shootPill();
        }
    });

    function shootPill() {
        let pill = document.createElement('div');
        pill.className = 'pill';
        pill.style.top = (birb_props.top + birb_props.bottom) / 2 - pill.offsetHeight / 2 + 'px';
        pill.style.left = birb_props.left + 'px';
        document.body.appendChild(pill);

        requestAnimationFrame(movePills);
    }

    function movePills() {
        let pilloe = document.querySelectorAll('.pill');
        pilloe.forEach((element) => {
            let pill_props = element.getBoundingClientRect();

            // Remove the pill when it goes out of the screen
            if (pill_props.right <= 0) {
                element.remove();
            }
            else {
                element.style.left = pill_props.left - 5 + 'px';
                requestAnimationFrame(movePills);
            }
        });
    }

    function all_in_one_package_deal(timestamp) {
        if (game_state != 'Play') return;

        if (timestamp - lastAnimationFrameTime < fpsInterval) {
            requestAnimationFrame(all_in_one_package_deal);
            return;
        }

        //moev
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            birb_props = birb.getBoundingClientRect();

            if (pipe_sprite_props.right <= 0) {
                element.remove();
            }
            else {
                if (birb_props.left < pipe_sprite_props.left + pipe_sprite_props.width
                    && birb_props.left + birb_props.width > pipe_sprite_props.left
                    && birb_props.top < pipe_sprite_props.top + pipe_sprite_props.height
                    && birb_props.top + birb_props.height > pipe_sprite_props.top) {
                    game_state = 'End';
                    message.innerHTML = 'game over LLLLLLLLLLL'.fontcolor('aquamarine') + '<br>refresh page to restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    document.addEventListener('keydown', (e) => {
                        if (e.key == 'Enter' && game_state != 'Play') {
                            message.classList.remove('messageStyle');
                            return;
                        }
                    })
                }
                else {
                    if (pipe_sprite_props.right < birb_props.left
                        && pipe_sprite_props.right + move_speed >= birb_props.left) {
                        score_val.innerHTML = + score_val.innerHTML + 0.5;
                        if (score_val.innerHTML % 3 == 2) {
                            requestAnimationFrame(spawnViroose);
                        }
                        move_speed = move_speed + 0.0625;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px'; //move the pipe sprite left by move_sped
                }
            }
        });

        //applygravite
        birb_dy = birb_dy + gravity;

        if (birb_props.top <= 0 || birb_props.bottom >= 1000) {
            game_state = 'End';
            message.innerHTML = 'game over LLLLLLLLLLL'.fontcolor('aquamarine') + '<br>refresh page to restart';
            message.classList.add('messageStyle');
            img.style.display = 'none';
            document.addEventListener('keydown', (e) => {
                if (e.key == 'Enter' && game_state != 'Play') {
                    message.classList.remove('messageStyle');
                    return;
                }
            })
        }
        birb.style.top = birb_props.top + birb_dy + 'px';
        birb_props = birb.getBoundingClientRect();

        //create eneme
        if (game_state != 'Play') return; //why are we here when we aren't even playing?

        if (pipe_seperation > 1000 * Math.pow(move_speed, -1) - move_speed) { //if it was too long with no pipe
            pipe_seperation = 0; //reset pipe lomg gap whatever
            let pipe_posi = Math.floor(Math.random() * 43) + 8; //the pipe vertic middle position
            let pipe_sprite_inv = document.createElement('div'); //create element called inverted pipe sprite. it's the upper pipe what did you expect
            pipe_sprite_inv.className = 'pipe_sprite'; //give it a class name too
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh'; //the top of the invert pipe sprite is 70 above the pipe vertic middle position. why?
            pipe_sprite_inv.style.left = '100vw'; //the pipe sprite inver is 100vw to the right of the left of the windoe which means it's off the screen for now
            document.body.appendChild(pipe_sprite_inv); //record it in the documents

            let pipe_sprite = document.createElement('div'); // make the bottom pipe sprite part
            pipe_sprite.className = 'pipe_sprite'; //call it pipe_sprite (groups wit pipe sprite inver?)
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh'; //the top is the pipe vertic middle position moved up pipe gap. why?
            pipe_sprite.style.left = '100vw'; //pipe_sprite_inv.style.left = '100vw'; 's bottom counterpart
            pipe_sprite.increase_score = '1'; // it increases the score by one... how great
            document.body.appendChild(pipe_sprite); //record it in the documents
        }
        pipe_seperation++; //and every frame the pipe horizon gap thing gets wider becaue it moved left





        function spawnViroose() {
            let viroose = document.createElement('div');
            viroose.className = 'viroose';
            viroose.style.top = birb.style.top;
            viroose.style.left = 0 + 'px';
            document.body.appendChild(viroose);

            // Move and check collisions after appending the viroose element
            requestAnimationFrame(moveViroose);
        }

        function moveViroose() {
            let viroosoe = document.querySelectorAll('.viroose');

            viroosoe.forEach((element) => {
                let virooseProps = element.getBoundingClientRect();

                if (virooseProps.right >= window.innerWidth) {
                    element.remove();
                }
                else {
                    element.style.left = virooseProps.left + viroose_move_speed + 'px'; //W lightspeed
                    // Continue moving the viroose
                    requestAnimationFrame(moveViroose);
                }

                if (birb_props.left < virooseProps.right &&
                    birb_props.right > virooseProps.left &&
                    birb_props.top < virooseProps.bottom &&
                    birb_props.bottom > virooseProps.top) {
                    game_state = 'End';
                    message.innerHTML = 'game over LLLLLLLLLLL'.fontcolor('aquamarine') + '<br>refresh page to restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    document.addEventListener('keydown', (e) => {
                        if (e.key == 'Enter' && game_state != 'Play') {
                            message.classList.remove('messageStyle');
                            return;
                        }
                    })
                }

                let pillCollision = false;
                many_pill_props.forEach((pill_props, index) => {
                    if (pill_props.right > virooseProps.left &&
                        pill_props.left < virooseProps.right &&
                        pill_props.bottom > virooseProps.top &&
                        pill_props.top < virooseProps.bottom) {
                        console.log('yay')
                        element.remove();
                        many_pill_props.splice(index, 1);
                        pillCollision = true;
                    }
                })
                if (pillCollision) {
                    score_val.innerHTML = + score_val.innerHTML + 0.5;
                }

            })
        }

        // Your game logic and rendering code here

        lastAnimationFrameTime = timestamp;

        // Continue the game loop
        requestAnimationFrame(all_in_one_package_deal);
    }
    requestAnimationFrame(all_in_one_package_deal);
}