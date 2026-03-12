 Live site :https://Aayusharma1973.github.io/itzfizz/
 REPO : https://github.com/Aayusharma1973/itzfizz
Built this as part of a frontend assignment. The task was to make a scroll-driven hero section inspired by a car scroll animation reference. I did the same concept but used a rocket instead.
Basically as you scroll down the rocket takes off — flame grows, smoke comes out, background goes dark like you're in space. Everything is synced to your scroll position so if you scroll slowly the rocket moves slowly, scroll fast and it shoots up. Felt like a better fit for the ITZFIZZ brand than just moving a car around.
Tech I used — React, Vite, GSAP for the animations and ScrollTrigger for the scroll stuff, and canvas for the stars and smoke particles since CSS can't really do that well.
To run it
bashnpm install
npm install gsap
npm run dev
To deploy
bashnpm run deploy
Just make sure the base in vite.config.js matches your repo name or the page will be blank on GitHub Pages