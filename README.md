# End-user markdown sketch

This is a description and proof-of-concept
of a proposed flavor of markdown for end-users on social websites.
The website explains things with demos:
[ryanatkn.github.io/end-user-markdown-sketch](https://ryanatkn.github.io/end-user-markdown-sketch)

This project copypasted a lot of code, especially from
[svelte-parse](https://github.com/pngwn/MDsveX/tree/master/packages/svelte-parse):

- [MDsveX](https://github.com/pngwn/MDsveX) -
  [LICENSE](https://github.com/pngwn/MDsveX/blob/master/LICENSE) - MIT License - Copyright (c) [pngwn](https://github.com/pngwn)
  - [svelte-parse](https://github.com/pngwn/MDsveX/tree/master/packages/svelte-parse) -
    base for [`$lib/parse_markdown.ts`](/src/lib/parse_markdown.ts)
  - [svast](https://github.com/pngwn/MDsveX/tree/master/packages/svast)
  - [svast-stringify](https://github.com/pngwn/MDsveX/tree/master/packages/svast-stringify)
- [unist](https://github.com/syntax-tree/unist) -
  [CC-BY-4.0](https://github.com/syntax-tree/unist/blob/main/package.json) -
  Copyright (c) [Titus Wormer](https://wooorm.com/)
  - some types in [`$lib/markdown.ts`](/src/lib/markdown.ts)

TODO

- clickable hash anchors
