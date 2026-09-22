# Pippz — Portfolio

My personal portfolio site: a home for what I'm working on right now, and what's coming next.

**Live:** [pippz.github.io](https://pippz.github.io/)

## Features

- Hand-drawn logo that draws itself on load and replays on hover
- Light / dark theme toggle, respecting the visitor's system preference by default
- Subtle smooth scrolling and scroll-triggered reveal animations
- Typing effects for the hero heading and for the upcoming-project placeholder
- Project list with status indicators (Live, In progress, Upcoming)
- Fully responsive, no build step required

## Tech stack

Plain HTML, CSS and JavaScript. No frameworks, no bundler, no dependencies — just static files served directly by GitHub Pages.

## Project structure

```
.
├── index.html      # Page structure and content
├── style.css       # Styling, theme variables, layout
├── script.js       # Logo animation, scroll behavior, theme toggle, typing effects
└── favicon.svg      # Tab icon (hand-drawn logo on a charcoal background)
```

## Customizing

- **Projects:** edit the `<li class="row">` entries inside the `#projects` section of `index.html`.
- **Colors:** all colors are CSS custom properties at the top of `style.css`, under `:root` (light theme) and `[data-theme="dark"]` (dark theme).
- **Upcoming project names:** edit the `data-phrases="..."` attribute on the typing-line span, with names separated by `|`.

## License

Source code is released under the MIT License. Photographs and other original media, if any, are not covered by this license.

## Contact

- GitHub: [@pippz](https://github.com/pippz)
- Email: pippz.dev@gmail.com
