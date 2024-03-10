[![Logo Image](https://i.imgur.com/rrp2f0j.png)](https://panel.pyro.host)

<p align="center">
 <a aria-label="Pyro logo" href="https://pyro.host"><img src="https://i.imgur.com/uvIy6cI.png"></a>
 <a aria-label="Join the Pyro community on Discord" href="https://discord.gg/fxeRFRbhQh?utm_source=githubreadme&utm_medium=readme&utm_campaign=OSSLAUNCH&utm_id=OSSLAUNCH"><img alt="" src="https://i.imgur.com/qSfKisV.png"></a>
 <a aria-label="Licensed under Business Source License 1.1" href="https://github.com/pyrohost/panel/blob/main/LICENSE"><img alt="" src="https://i.imgur.com/DHx8Cz6.png"></a>
</p>

<h1 align="center">pyrodactyl by pyro.host</h1>

pyrodactyl is the Pterodactyl-based game server management panel. Our fork focuses on performance enhancements, a reimagined, accessible interface, and top-tier developer experience. Builds faster, compiles smaller: pyrodactyl is the world's best Pterodactyl.

[![Dashboard Image](https://pyro.host/img/panel1.jpg)](https://panel.pyro.host)

## Changes from vanilla Pterodactyl

-   **Smaller bundle sizes:** pyrodactyl is built using Vite, and significant re-architecting of the application means pyrodactyl's initial download size is over **[170 times smaller than leading, closed-source Pterodactyl forks](https://i.imgur.com/tKWLHhR.png)**
-   **Faster build times:** pyrodactyl completes builds in milliseconds, with cold builds consistently being under **7 seconds**.
-   **Faster loading times:** pyrodactyl's load times are, on average, **[over 16 times faster](https://i.imgur.com/28XxmMi.png)** than other closed-source Pterodactyl forks. Smarter code splitting and chunking means that pages you visit in the panel only load necessary resources on demand. Better caching means that everything is simply _snappy_.
-   **More secure:** pyrodactyl's modern architecture means **most severe and easily exploitable CVEs simply do not exist**. We have also implemented SRI and integrity checks for production builds.
-   **More accessible:** Pyro believes that gaming should be easily available for everyone. pyrodactyl builds with the latest Web accessibility guidelines in mind. pyrodactyl is **entirely keyboard-navigable, even context menus.**, and screen-readers are easily compatible.
-   **More approachable:** pyrodactyl's friendly, approachable interface means that anyone can confidently run a game server [with Pyro](https://pyro.host).

[![Dashboard Image](https://pyro.host/img/panel3.jpg)](https://panel.pyro.host)

## Running Locally

pyrodactyl is the world's first Pterodactyl panel that can be developed and run locally (with Wings) on Windows machines through [Vagrant](https://www.vagrantup.com/).

You will need a working installation of Vagrant, the latest LTS version of NodeJS, the latest version of npm, the latest version of [Turbo](https://turbo.build), and the latest version of pnpm to properly run pyro. Once you have verified you have Vagrant, NodeJS, npm, Turbo and pnpm installed, you can follow the steps below:

1. Clone the pyrodactyl panel repository
2. Run `npm i` to install all the packages for the website.
3. Run `pnpm build:turbo` to build pyrodactyl. This will cache the results of the build and upload sourcemaps to Sentry. Subsequent builds without code changes will finish in milliseconds.
4. Run `vagrant up`. This will setup wings and the necessary services in order to run pyrodactyl's databases, services, and app. This process could take up to 15 minutes.
5. Once you receive a message that says "pyrodactyl is now up and running at localhost:3000", visit that URL in your browser and login with the default credentials provided in your console. **It's important that you use localhost to connect to pyrodactyl! If you use 127.0.0.1, you will run into CORS issues and other issues that will not be fixed.**
6. Visit localhost:3000/admin to provision your first server on pyrodactyl!

## Star History

<a href="https://star-history.com/#pyrohost/panel&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=pyrohost/panel&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=pyrohost/panel&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=pyrohost/panel&type=Date" />
  </picture>
</a>

## License

Pterodactyl® Copyright © 2015 - 2022 Dane Everitt and contributors.

pyrodactyl™ Copyright © 2024 pyro.host

pyrodactyl™ and its source code is licensed and distributed under Business Source License 1.1. Please see the [LICENSE](https://github.com/pyrohost/panel/blob/main/LICENSE) file for more information on your rights to use pyrodactyl.
