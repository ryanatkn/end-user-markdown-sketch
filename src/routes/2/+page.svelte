<script lang="ts">
	import 'prismjs'; // TODO shouldn't be needed
	import Code from '@ryanatkn/fuz_code/Code.svelte';

	import Markdown from '$lib/Markdown.svelte';
</script>

<main class="width_md">
	<div class="width_full">
		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h2 id="introduction">Introduction</h2>
				<p>
					The <code>parse_markdown.ts</code> module provides a parser for a custom language that extends
					Svelte and HTML with some Markdown and Markdown-like features. This document serves as a full
					specification for the parser, describing its features, syntax, and behavior.
				</p>
			</div>
		</section>

		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h2 id="features">Features</h2>
				<p>The parser supports the following features:</p>
				<ul>
					<li>
						<strong>Bold Text</strong>: Implemented using single asterisks. For example, <Code
							content="*bold text*"
						/> renders as <Markdown content="*bold text*" />.
					</li>
					<li>
						<em>Italic Text</em>: Implemented using single underscores. For example, <Code
							content="_italic text_"
						/> renders as <Markdown content="_italic text_" />.
					</li>
					<li>
						<strong>Mentions</strong>: Prefixed with <code>@</code>. For example, <Code
							content="@username"
						/> renders as <Markdown content="@username" />.
					</li>
					<li>
						<strong>Hashtags</strong>: Prefixed with <code>#</code>. For example, <Code
							content="#hashtag"
						/> renders as <Markdown content="#hashtag" />.
					</li>
					<li>
						<strong>Absolute Links</strong>: Starting with <code>/</code>. For example, <Code
							content="/path/to/resource"
						/> renders as <Markdown content="/path/to/resource" />.
					</li>
					<li>
						<strong>Global Links</strong>: Starting with <code>//</code>, <code>http://</code>, or
						<code>https://</code>. For example, <Code content="https://example.com" /> renders as <Markdown
							content="https://example.com"
						/>.
					</li>
					<li>
						<strong>Inline Code</strong>: Wrapped with backticks. For example, <Code
							content="\`code\`"
						/> renders as <Markdown content="\`code\`" />.
					</li>
					<li>
						<strong>Code Blocks</strong>: Wrapped with triple backticks. For example:
						<Code content={`\`\`\`\ncode block\n\`\`\``} />
						renders as:
						<Markdown content={`\`\`\`\ncode block\n\`\`\``} />
					</li>
					<li>
						<strong>Blockquotes</strong>: Lines starting with <code>></code>. For example, <Code
							content="> quoted text"
						/> renders as <Markdown content="> quoted text" />.
					</li>
					<li>
						<strong>Lists</strong>: Lines starting with <code>- </code>. For example:
						<Code content="- item 1\n- item 2" />
						renders as:
						<Markdown content="- item 1\n- item 2" />
					</li>
					<li>
						<strong>HTML Elements</strong>: Standard HTML tags. For example, <Code
							content="<div>content</div>"
						/> renders as <Markdown content="<div>content</div>" />.
					</li>
					<li>
						<strong>Svelte Components</strong>: Custom components with capitalized names. For
						example, <Code content="<Component>content</Component>" /> renders as <Markdown
							content="<Component>content</Component>"
						/>.
					</li>
					<li>
						<strong>Expressions</strong>: Wrapped with curly braces. For example, <Code
							content={'{expression}'}
						/> renders as <Markdown content={'{expression}'} />.
					</li>
				</ul>
			</div>
		</section>

		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h2 id="syntax">Syntax Details</h2>
				<h3>Bold Text</h3>
				<p>
					Bold text is created by wrapping content with single asterisks <code>*</code>. For
					example:
				</p>
				<Code content="*bold text*" />
				<p>renders as:</p>
				<Markdown content="*bold text*" />
				<p>
					Note that double asterisks <Code content="**not bold**" /> are treated as plain text.
				</p>

				<h3>Italic Text</h3>
				<p>
					Italic text is created by wrapping content with single underscores <code>_</code>. For
					example:
				</p>
				<Code content="_italic text_" />
				<p>renders as:</p>
				<Markdown content="_italic text_" />
				<p>
					Double underscores <Code content="__not italic__" /> are treated as plain text.
				</p>

				<h3>Mentions and Hashtags</h3>
				<p>
					Mentions are prefixed with <code>@</code>, and hashtags are prefixed with <code>#</code>.
					For example:
				</p>
				<Code content="@username #hashtag" />
				<p>renders as:</p>
				<Markdown content="@username #hashtag" />

				<h3>Links</h3>
				<p>
					Absolute links start with <code>/</code>, and global links start with <code>//</code>,
					<code>http://</code>, or <code>https://</code>. For example:
				</p>
				<Code content="/path/to/resource" />
				<p>renders as:</p>
				<Markdown content="/path/to/resource" />

				<Code content="https://example.com" />
				<p>renders as:</p>
				<Markdown content="https://example.com" />

				<h3>Inline Code and Code Blocks</h3>
				<p>
					Inline code is wrapped with backticks <code>`</code>. For example:
				</p>
				<Code content="\`inline code\`" />
				<p>renders as:</p>
				<Markdown content="\`inline code\`" />

				<p>
					Code blocks are wrapped with triple backticks <code>```</code>. For example:
				</p>
				<Code content={`\`\`\`\ncode block\n\`\`\``} />
				<p>renders as:</p>
				<Markdown content={`\`\`\`\ncode block\n\`\`\``} />

				<h3>Blockquotes</h3>
				<p>
					Lines starting with <code>></code> are treated as blockquotes. For example:
				</p>
				<Code content="> This is a blockquote" />
				<p>renders as:</p>
				<Markdown content="> This is a blockquote" />

				<h3>Lists</h3>
				<p>
					Unordered lists are created by starting lines with <code>- </code>. For example:
				</p>
				<Code content="- Item 1\n- Item 2\n- Item 3" />
				<p>renders as:</p>
				<Markdown content="- Item 1\n- Item 2\n- Item 3" />

				<h3>HTML Elements and Svelte Components</h3>
				<p>
					Standard HTML elements and Svelte components can be included. Components are distinguished
					by their capitalized names. For example:
				</p>
				<Code content="<div>HTML content</div>" />
				<p>renders as:</p>
				<Markdown content="<div>HTML content</div>" />

				<Code content="<Component>Component content</Component>" />
				<p>renders as:</p>
				<Markdown content="<Component>Component content</Component>" />

				<h3>Expressions</h3>
				<p>
					Expressions are wrapped with curly braces <code>{'{expression}'}</code>. For example:
				</p>
				<Code content={'{expression}'} />
				<p>renders as:</p>
				<Markdown content={'{expression}'} />
			</div>
		</section>

		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h2 id="ast">Abstract Syntax Tree (AST)</h2>
				<p>
					The parser produces an Abstract Syntax Tree (AST) representing the parsed content. The AST
					nodes include:
				</p>
				<ul>
					<li><code>Code_Node</code></li>
					<li><code>Code_Block_Node</code></li>
					<li><code>Bold_Node</code></li>
					<li><code>Italic_Node</code></li>
					<li><code>Mention_Node</code></li>
					<li><code>Hashtag_Node</code></li>
					<li><code>Absolute_Link_Node</code></li>
					<li><code>Global_Link_Node</code></li>
					<li><code>Element_Node</code></li>
					<li><code>Component_Node</code></li>
					<li><code>Expression_Node</code></li>
					<li><code>Text_Node</code></li>
					<li><code>Attribute_Node</code></li>
					<li><code>Markdown_Link_Node</code></li>
					<li><code>Blockquote_Node</code></li>
					<li><code>List_Node</code></li>
					<li><code>List_Item_Node</code></li>
				</ul>
				<p>
					Each node type has specific properties representing its content and structure. For
					example, a <code>Bold_Node</code> contains a list of child nodes representing the content within
					the bold formatting.
				</p>
			</div>
		</section>

		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h2 id="examples">Examples</h2>
				<p>Below are examples of input text and the corresponding AST output.</p>

				<!-- Example 1 -->
				<h3>Example 1: Bold and Italic Text</h3>
				<p>Input:</p>
				<Code content="This is *bold* text and _italic_ text." />
				<p>AST Output:</p>
				<Code
					content={`[
  { type: 'Text', content: 'This is ', start: 0, end: 8 },
  { type: 'Bold', children: [ { type: 'Text', content: 'bold', start: 9, end: 13 } ], start: 8, end: 14 },
  { type: 'Text', content: ' text and ', start: 14, end: 23 },
  { type: 'Italic', children: [ { type: 'Text', content: 'italic', start: 24, end: 30 } ], start: 23, end: 31 },
  { type: 'Text', content: ' text.', start: 31, end: 37 }
]`}
					lang="ts"
				/>

				<!-- Example 2 -->
				<h3>Example 2: Links and Mentions</h3>
				<p>Input:</p>
				<Code content="Visit /home or https://example.com. Contact @admin." />
				<p>AST Output:</p>
				<Code
					content={`[
  { type: 'Text', content: 'Visit ', start: 0, end: 6 },
  { type: 'Absolute_Link', href: '/home', start: 6, end: 11 },
  { type: 'Text', content: ' or ', start: 11, end: 15 },
  { type: 'Global_Link', href: 'https://example.com', start: 15, end: 34 },
  { type: 'Text', content: '. Contact ', start: 34, end: 44 },
  { type: 'Mention', name: 'admin', start: 44, end: 50 },
  { type: 'Text', content: '.', start: 50, end: 51 }
]`}
					lang="ts"
				/>

				<!-- Example 3 -->
				<h3>Example 3: Code Blocks</h3>
				<p>Input:</p>
				<Code
					content={`\`\`\`javascript\nfunction hello() {\n  console.log('Hello, world!');\n}\n\`\`\``}
				/>
				<p>AST Output:</p>
				<Code
					content={`[
  {
    type: 'Code_Block',
    content: "function hello() {\n  console.log('Hello, world!');\n}",
    language: 'javascript',
    fence: '\`\`\`',
    leading_whitespace: '\\n',
    trailing_whitespace: '\\n',
    start: 0,
    end: 69
  }
]`}
					lang="ts"
				/>

				<!-- More examples can be added -->
			</div>
		</section>

		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h2 id="extensibility">Extensibility</h2>
				<p>
					The parser is designed to be extensible, allowing for custom syntax and behaviors to be
					added as needed. Developers can modify the parser to support additional features or adjust
					existing ones.
				</p>
				<p>
					For instance, new types of inline formatting or custom components can be introduced by
					extending the parsing logic and updating the AST node definitions accordingly.
				</p>
			</div>
		</section>

		<section class="panel p_md section_xl">
			<div class="panel_inner">
				<h2 id="conclusion">Conclusion</h2>
				<p>
					The <code>parse_markdown.ts</code> module provides a flexible and extensible parser for integrating
					Markdown-like features into Svelte and HTML content. By understanding the supported syntax
					and AST structure, developers can effectively utilize and customize the parser for their applications.
				</p>
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

	/* Additional styles as needed */
	h2 {
		margin-top: 0 !important;
	}
	section:last-child {
		margin-bottom: 0 !important;
	}
</style>
