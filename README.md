# 🚀🏰

Welcome to Rocket Castle: a platform for people to create and play interactive text-based games and stories.

## How to Create a Game

1. Start by creating a GitHub fork of the [RocketCastle repository](https://github.com/bluefeet/RocketCastle). You will be making all of your code changes in this fork and submitting them back to the main repository as a pull request.
2. Use the `grungle` game as a template for your new game by copying it and modifying the `yourgame/index.html`, `yourgame/index.js`, and `yourgame/index.css` to fit.  The `yourgame` bit should be a lowercase, alphanumeric, dash-separated, string.
3. Edit the root `index.html` to include your game in the `experience` room.
4. Edit `_redirects` and copy the `grungle` lines and modify to fit for `yourgame`.
5. Commit and push your work to GitHub.
6. Open a pull request and, pending a positive review, your game will be deployed on [rocketcastle.com](https://rocketcastle.com)!

## Anatomy of a Room

A room is a plain JavaScript object which must have several properties set:

```js
{
  // Short text, usually title cased.
  "title": "Title of Example",

  // Longer text description of the room.
  "detail": "This is a place.\n\nWhat would you like to do?",

  // An array of option arrays which the user may select from.
  "options": [
    // Each option is itself an array.
    [
      // The message to display to the user.
      "Click here to say hi!",

      // Which macro to trigger when this option is selected.
      "tell",

      // And then any macro arguments.
      "hi!"
    ]
  ]
}
```

The `detail` property may be an array rather than a string.  If it is, then the array will be joined with `\n\n` to produce the final string.

## Conditionally Displayed Options

An option's message may be a macro array instead of a string.  If it is, then the macro will be run and its return value used as the message.  If the return message is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) then the option will not be shown.

Here's a set of options which allow the player to pick and eat apples:

```js
"options": [
  // Increases the number of apples by 1 when chosen.
  ["Pick an apple.", "inc", "apple"],
  // Decrease the number of apples by 1 when chosen.
  ["Eat an apple.", "dec", "apple"]
]
```

The problem here is that if all you do is eat apples then you're going to have negative apples and that makes no sense.  We want the `"Eat an apple."` option to be shown only if the player has at least 1 apple.  This can be accomplished by replacing the message with an `if` macro:

```js
"options": [
  ["Pick an apple.", "inc", "apple"],
  // This option only shows if "apple" is truthy.
  [["if",["get","apple"],"Eat an apple."], "dec", "apple"]
]
```

Check out the [example Grungle game](https://rocketcastle.com/grungle/) (see the room definition [here](https://github.com/bluefeet/RocketCastle/blob/master/grungle/index.js)) for a slightly more complex example of this apple picking business.

## Macros

| Name | Example | Description |
| --- | --- | --- |
| clear | `["clear", key]` | Remove the key from the world state. |
| dec | `["dec", key]` | Decreases the value of the key by `1`. |
| do | `["do", macro1, macro2]` | Runs all of the specified macros. |
| flag | `["flag", key]` | Sets the key to `true`. |
| format | `["format", "thing is {0}", thing]` | Interpolate values into a string. |
| get | `["get", key]` | Returns the value for the key. |
| has | `["has", key]` | Return `true` or `false` depending on the existence of the key. |
| if | `["if", check, ifTrue, ifFalse]` | Calls `check` and then, depending on the result, returns either `ifTrue` or `ifFalse`. |
| inc | `["inc", key]` | Increases the value of the key by `1`. |
| move | `["move", roomKey]` | Moves the player to the specified room. |
| op | `["op", left, ">", right]` | Returns the result of applying the operator to the left and right operands. Supported operators are `+`, `-`, `/`, `*`, `%`, `**`, `<`, `>`, `<=`, `>=`, `==`, `!=`, `||`, and `&&`. |
| random | `["random", thing1, thing2]` | Randomly picks a single thing from the specified list and returns it. |
| reset | `["reset"]` | Resets the game by restoring the world state to the initial state. |
| set | `["set", key, value]` | Sets the key to the value within the world state. |
| tell | `["tell", message]` | Displays a message for the player to read. |
| toggle | `["toggle", key]` | Switches the key from `true` to `false`, and back. |

## Macro Arguments

Any macro argument can itself be a macro.  So, for example if you wanted tell the player how many apples they have you'd pass the `message` argument to `tell` like so:

```js
[ "tell", ["format","You have {0} apples!",["get","apple"]] ]
```

## TODO

- Documentation!
- Better home page game.
- Better grungle game with more examples.
- Declare design principals, coding practices, git hygiene.
- Community: Social networking, wiki, discord?
- Declare MIT (?) license.
- Define rules of conduct and safe content.
- Figure out how licenses should be assigned to an author's work.  Likely will just require that all content (including external) is licensed under a creative commons license.
- Move all worlds to JSON (or YAML? mmm) files.  This will make accepting pull requests easier as JSON doesn't have executable code to watch out for.
- Plugin system for things like adding mechanics (health, hunger, sanity, time).
- More flexibility in the DOM and what information is shown where and how.
- Unit tests.
- Probably publish the js to npm.
- Run games from the command line.
- Add an `ask` macro for asking the user to pick from a set of options. Probably in a modal dialogue. This will allow for, for example, having a complex conversation with an NPC. Without this the same can be accomplished with multiple rooms.
- Possibly expand the `format` macro to support named values rather than positional.  Also, supporting actual formatting of the value would be nice (`%.02d` for example, etc).
- Change the `tell` macro to not use `alert()`. Make more pretty.
- Fix "pull down to refresh" on my phone.
