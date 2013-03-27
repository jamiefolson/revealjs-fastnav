revealjs-fastnav
================

A simple plugin for Reveal.js to allow slide navigation ignoring animations.

Hold shift while pressing arrow keys to skip any revealed or unrevealed animations.  Activated with `RevealNav.setup()`

```
Reveal.initialize({
    dependencies: [
            // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
                    { src: 'path/to/reveal-nav.js', callback: function() { RevealNav.setup(); } }
                    });]
})
```
