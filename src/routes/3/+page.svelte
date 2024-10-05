<script lang="ts">
	import {base} from '$app/paths';
	import Markdown from '$lib/Markdown.svelte';
	import Markdown_Playground from '$lib/Markdown_Playground.svelte';

	let current_time = new Date().toLocaleTimeString();

	setInterval(() => {
		current_time = new Date().toLocaleTimeString();
	}, 1000);

	const sections = [
		{
			title: 'Basic Markdown Syntax',
			content: `
# Heading 1
## Heading 2
### Heading 3

This is *bold text* and this is _italic text_.

Here's some \`inline code\`.
			`,
		},
		{
			title: 'Code Blocks',
			content: `
Here's a code block:

\`\`\`typescript
function greet(name: string) {
	console.log(\`Hello, \${name}!\`);
}
greet('Markdown Parser');
\`\`\`
			`,
		},
		{
			title: 'Links',
			content: `
Here are various types of links:

1. [Markdown link](https://example.com)
2. /absolute/link
3. //global.link
4. https://another.global.link
			`,
		},
		{
			title: 'Lists',
			content: `
Unordered list:
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

Ordered list:
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item
			`,
		},
		{
			title: 'Blockquotes',
			content: `
Here's a blockquote:

> This is a blockquote.
> It can span multiple lines.
> 
> It can also contain other Markdown elements:
> 
> - Like lists
> - *Bold text*
> - [Links](https://example.com)
			`,
		},
		{
			title: 'Mentions and Hashtags',
			content: `
Hello @user! Have you seen the latest #SvelteNews?

You can also mention @anotheruser and use multiple hashtags like #Markdown #Parser.
			`,
		},
		{
			title: 'HTML Elements',
			content: `
<div class="custom-class">
	<p>This is a paragraph inside a div.</p>
	<img src="${base}/placeholder.jpg" alt="A placeholder image" width="200" height="100" />
</div>

<table>
	<tr>
		<th>Header 1</th>
		<th>Header 2</th>
	</tr>
	<tr>
		<td>Row 1, Cell 1</td>
		<td>Row 1, Cell 2</td>
	</tr>
</table>
			`,
		},
		{
			title: 'Custom Svelte Components',
			content: `
<CustomComponent prop="Hello">
	This is inside a custom component
</CustomComponent>

You can also use self-closing custom components:

<CustomComponent prop="World" />
			`,
		},
		{
			title: 'Svelte Expressions',
			content: `
The current time is: {current_time}

You can use any valid JavaScript expression:

2 + 2 = {2 + 2}

Array.from({length: 5}, (_, i) => i + 1):
{Array.from({length: 5}, (_, i) => i + 1).join(', ')}
			`,
		},
		{
			title: 'Complex Nesting',
			content: `
<div class="complex-nesting">
	<h3>Complex Nesting Example</h3>
	<p>
		This paragraph contains <strong>bold text</strong> and a 
		<CustomComponent prop="nested">
			nested component <em>with italic text</em> and a
			<ul>
				<li>Nested list</li>
				<li>With multiple items</li>
			</ul>
		</CustomComponent>.
	</p>
	<blockquote>
		This blockquote is inside a div and contains a [link](https://example.com).
		It also has a mention @user and a hashtag #NestedContent.
		<code>Even some inline code</code>
	</blockquote>
</div>
			`,
		},
	];
</script>

<main class="width_md">
	<div class="width_full">
		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h1>Markdown Parser Demo</h1>
				<p>
					This demo showcases the capabilities of our custom Markdown parser. It supports a wide
					range of Markdown features, HTML elements, and custom Svelte components.
				</p>
			</div>
		</section>

		{#each sections as section}
			<section class="panel p_md section_xl">
				<div class="panel_inner">
					<h2>{section.title}</h2>
					<div class="example-container">
						<div class="markdown-input">
							<h3>Markdown Input</h3>
							<pre><code>{section.content}</code></pre>
						</div>
						<div class="markdown-output">
							<h3>Rendered Output</h3>
							<Markdown text={section.content} />
						</div>
					</div>
				</div>
			</section>
		{/each}

		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h2>Markdown Playground</h2>
				<p>
					Try out the Markdown parser yourself! Enter your Markdown in the text area below and see
					it rendered in real-time.
				</p>
				<Markdown_Playground />
			</div>
		</section>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}

	.panel_inner {
		padding: var(--space_md);
		background-color: var(--bg);
		border-radius: var(--radius_xs);
	}

	h1,
	h2,
	h3 {
		color: var(--text_2);
	}

	.example-container {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space_md);
		margin-top: var(--space_md);
	}

	.markdown-input,
	.markdown-output {
		flex: 1 1 45%;
		min-width: 300px;
	}

	.markdown-input pre {
		background-color: var(--surface_2);
		padding: var(--space_sm);
		border-radius: var(--radius_xs);
		overflow-x: auto;
	}

	.markdown-output {
		background-color: var(--surface_1);
		padding: var(--space_sm);
		border-radius: var(--radius_xs);
	}

	:global(.markdown-output img) {
		max-width: 100%;
		height: auto;
	}

	/* Ensure proper spacing between sections */
	.section_xl {
		margin-bottom: var(--space_xl);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.example-container {
			flex-direction: column;
		}
	}
</style>
