# 🚀🏰

Welcome to Rocket Castle: a platform for people to create and play interactive, single-player, games and stories.

Rocket Castle is currently just a couple hundred lines of JavaScript, CSS, and HTML. Nothing at all is formalized and everything has and will change.

The primary goal of the project is to teach my kids programming using JavaScript.

# Anatomy of a Room

All Rocket Castle games start off in a single room which the player is expected to interact with.  A room, in its most technical form, is a dynamic, read-only, JavaScript property which uses [Space Bricks](#Space%20Bricks) to return [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) objects.

```js
get mainRoom () {
  const b = this.bricks;

  return b.div(
    b.title( 'Some Big Thing' ),
    b.p( 'Hello world this is a paragraph!' ),
  );
}
```

# Space Bricks

[SpaceBricks.js](https://github.com/bluefeet/RocketCastle/blob/master/SpaceBricks.js) provides a high-level and simplistic API for creating [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) objects specifically tailored to work with the [Bootstrap]https://getbootstrap.com/) front-end framework. Generating content for a Rocket Castle room is done entirely using Space Bricks.

See the [demo game](https://rocketcastle.com/demo/) for examples of all the available bricks.

# Ideas

- Create base themes like `dungeon`, `forest`, `space`, etc.
- Handle dark/light modes as a base set of CSS games can pick from. [This article](https://css-tricks.com/dark-modes-with-css/) talks about some important styling points on dark sites.
- Make the `tell` method produce a custom modal rather than calling `alert()`.
- Add an `ask` method which gives the ability to ask the player questions in a modal.
- Formalize a way to create mixins to add, for example, game mechanics or new UI elements.
- Create a guide that can take a kid from zero to a game.
- Loot tables? Encounter tables?
- More foundation components!
