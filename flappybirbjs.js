let move_speed = 3, gravity = 0.5;
let birb = document.querySelector('.birb');
let img = document.getElementById('birb');

let birb_props = birb.getBoundingClientRect();

let lastAnimationFrameTime = 0;
const fpsInterval = 1000 / 200; // 60 frames per second

let viroose_move_speed = 10;
let virooseimaeg = document.getElementById('viroose');

let background = document.querySelector('.background').getBoundingClientRect;

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && game_state != 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
           e.remove();
        })
        img.style.display = 'block';
        birb.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
})

function play () {

    /*
    function gameLoop(timestamp) {
        // Throttle the game loop to 60 frames per second
        if (timestamp - lastAnimationFrameTime < fpsInterval) {
        requestAnimationFrame(gameLoop);
        return;
        }

    // Your game logic and rendering code here

    lastAnimationFrameTime = timestamp;

    // Continue the game loop
    requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    requestAnimationFrame(gameLoop);
    */

    let birb_dy = 0;
    let pipe_seperation = 0;
    let pipe_gap = 35;

    document.addEventListener('keydown', e => {
        if(e.key == 'ArrowUp' || e.key == ' ') {
            img.src = 'flappingcat.png';
            birb_dy = -7.6;
        } 
    });

    document.addEventListener('keyup', (e) => {
        if(e.key == 'ArrowUp' || e.key == ' '){
            img.src = 'flappycat.png';
        }
    });

    
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

            if(pipe_sprite_props.right <= 0) {
                element.remove();
            }
            else {
                if(birb_props.left < pipe_sprite_props.left + pipe_sprite_props.width 
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
                    if(pipe_sprite_props.right < birb_props.left
                    && pipe_sprite_props.right + move_speed >= birb_props.left) {
                        score_val.innerHTML =+ score_val.innerHTML + 0.5;
                        if (score_val.innerHTML >= 2) {
                            virooseimaeg.classList.toggle("visible");
                        }
                        move_speed = move_speed + 0.25;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });

        //applygravite
        birb_dy = birb_dy + gravity;

        if(birb_props.top <= 0 || birb_props.bottom >= 1000) {
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
        if(game_state != 'Play') return;

        if(pipe_seperation > 1000 * Math.pow(move_speed, -1) - move_speed) {
            pipe_seperation = 0;
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        
        

        // Container to hold the images
        var viroosecontainer = document.getElementById("viroose");

        if ((score_val.innerHTML * 2) % 5 == 2 && game_state == 'Play') {
            var virooseimage = document.createElement("viroose");
            virooseimage.className = "moving-viroose";
            viroosecontainer.appendChild(virooseimage);

            var x = 0;
            var y = -912932138;

            virooseimage.style.transform = "translate(" + x + "px, " + y + "px)";
        }

        // Your game logic and rendering code here

        lastAnimationFrameTime = timestamp;

        // Continue the game loop
        requestAnimationFrame(all_in_one_package_deal);
    }
    requestAnimationFrame(all_in_one_package_deal);
}

    /*
    function move() {
        if (game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            birb_props = birb.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0) {
                element.remove();
            }
            else {
                if(birb_props.left < pipe_sprite_props.left + pipe_sprite_props.width 
                && birb_props.left + birb_props.width > pipe_sprite_props.left 
                && birb_props.top < pipe_sprite_props.top + pipe_sprite_props.height
                && birb_props.top + birb_props.height > pipe_sprite_props.top) {
                    game_state = 'End';
                    message.innerHTML = 'game over LLLLLLLLLLL'.fontcolor('aquamarine') + '<br>press enter to restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    return;
                }
                else {
                    if(pipe_sprite_props.right < birb_props.left
                    && pipe_sprite_props.right + move_speed >= birb_props.left) {
                        score_val.innerHTML =+ score_val.innerHTML + 0.5;
                        if (score_val.innerHTML >= 2) {
                            virooseimaeg.classList.toggle("visible");
                        }
                        move_speed = move_speed + 0.25;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let birb_dy = 0;
    function apply_gravity(){
        if (game_state != 'Play') return;
        birb_dy = birb_dy + gravity;
        document.addEventListener('keydown', e => {
            if(e.key == 'ArrowUp' || e.key == ' ') {
                img.src = 'flappingcat.png';
                birb_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'IMG_1031.png';
            }
        });

        if(birb_props.top <= 0 || birb_props.bottom >= 1000) {
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        birb.style.top = birb_props.top + birb_dy + 'px';
        birb_props = birb.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;
    let pipe_gap = 35;

    function create_eneme(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 1000 * Math.pow(move_speed, -1) - move_speed) {
            pipe_seperation = 0;
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        
        

        // Container to hold the images
        var viroosecontainer = document.getElementById("viroose");

        if ((score_val.innerHTML * 2) % 5 == 2 && game_state == 'Play') {
            var virooseimage = document.createElement("viroose");
            virooseimage.className = "moving-viroose";
            viroosecontainer.appendChild(virooseimage);

            var x = 0;
            var y = -912932138;

            virooseimage.style.transform = "translate(" + x + "px, " + y + "px)";
        }



        requestAnimationFrame(create_eneme);
    }
    requestAnimationFrame(create_eneme);

    /*
    
    function viroose() {
        if (score_val.innerHTML < 2 || game_state != 'Play') {
            return;
        }

        virooseimaeg.classList.toggle("visible");

        /// let virooose = document.querySelectorAll('.viroose');

        ---------------------------------------------------------------------
        virooose.forEach((element) => {
            
            let viroose_props = element.getBoundingClientRect();

            function summon_viroose(){
                let viroose_sprite = document.querySelectorAll('.viroose')[0];
                viroose_sprite.style.left = 0;
                viroose_props.left = 0;
                viroose_sprite.style.top = birb_props.top;
                viroose_props.top = birb_props.top;
                if (viroose_props.left >= background.right){
                    element.remove();
                }
                document.body.appendChild(viroose_sprite);
                requestAnimationFrame(summon_viroose);
            }
            requestAnimationFrame(summon_viroose);

            function move_le_viroose(){
                element.style.left = viroose_props.left.left - viroose_move_speed + 'px';
                requestAnimationFrame(move_le_viroose);
            }
            requestAnimationFrame(move_le_viroose);

            function viroose_interaction(){
                requestAnimationFrame(viroose_interaction);
            }
            requestAnimationFrame(viroose_interaction);

        })
        ---------------------------------------------------------------------

        if (score_val.innerHTML >= 2) {
            requestAnimationFrame(viroose);
        }
    }
    if (score_val.innerHTML >= 2) {
        requestAnimationFrame(viroose);
    }
    */
