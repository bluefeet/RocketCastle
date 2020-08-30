# 🚀🏰

Welcome to Rocket Castle.  We're building a platform for people to create and play interactive  text-based games and stories.

## How to Create a Game

1. Start by creating a GitHub fork of the [RocketCastle repository](https://github.com/bluefeet/RocketCastle). You will be making all of your code changes in this fork and submitting them back to the main repository as pull requests.
2. Use the `grungle` game as a template for your new game by copying it and modifying the `yourgame/index.html`, `yourgame/index.js`, and `yourgame/index.css` to fit.  The `yourgame` bit should be a lowercase, alphanumeric, dash-separated, string.
3. Edit the root `index.html` to include your game in the `experience` room.
4. Edit `_redirects` and copy the `grungle` lines and modify to fit for `yourgame`.
5. Commit and push your work to GitHub.
6. Open a pull request to have your game deployed on [rocketcastle.com](https://rocketcastle.com)!

## TODO

- Documentation!
- Better home page game.
- Better grungle game with more examples.
- Declare design principals, coding practices, git hygiene.
- More community. Social networking, wiki, discord?
- Declare MIT license.
- Define rules of conduct and safe content.
- Figure out how licenses should be assigned to an author's work.  Likely will just require that all content (including external) is licensed under a creative commons license.
- Move all worlds to JSON files.  This will make accepting pull requests easier as JSON doesn't have executable code to watch out for.
- Plugin system for things like adding mechanics (health, hunger, sanity, time).
- More flexibility in the DOM and what information is shown where and how.
- Unit tests.
