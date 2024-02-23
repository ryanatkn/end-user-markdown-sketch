<script lang="ts">
	import {base} from '$app/paths';
	import 'prismjs'; // TODO shouldn't be needed
	import Code from '@ryanatkn/fuz_code/Code.svelte';

	import Markdown_Playground from '$lib/Markdown_Playground.svelte';
	import Markdown from '$lib/Markdown.svelte';
	import Markdown_Example from '$routes/Markdown_Example.svelte';
	import {ALLOWED_HTML_ATTRS, get_components} from '$lib/view';

	const components = get_components();
</script>

<main class="prose width_md">
	<div class="width_full">
		<section class="panel padded_md section_xl">
			<div class="panel_inner">
				<h2 id="motivation">Motivation</h2>
				<p>
					Many social websites provide rich text features to end-users like
					<Markdown content="*bold* text and @mentions and #hashtags" />. Markdown is the common
					name for this markup, although the specifics differ:
				</p>
				<ul>
					<li>
						<a
							href="https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-"
							>Discord Markdown</a
						>
					</li>
					<li>
						<a
							href="https://support.microsoft.com/en-au/office/use-markdown-formatting-in-microsoft-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772"
							>Teams Markdown</a
						>
					</li>
					<li><a href="https://api.slack.com/reference/surfaces/formatting">Slack mrkdwn</a></li>
				</ul>
				<p>Some platform-independent markdowns include:</p>
				<ul>
					<li><a href="https://github.github.com/gfm/">GitHub Flavored Markdown</a></li>
					<li><a href="https://mdsvex.pngwn.io/">MDsveX</a> (this sketch is based on its code)</li>
					<li><a href="https://djot.net/">djot</a></li>
					<li><a href="https://commonmark.org/">CommonMark</a></li>
				</ul>
				<p>
					There are many markdowns. This project describes a proposed flavor of markdown designed
					for the end-users and developers of an unannounced social app framework. My goal is to
					provide these capabilities to end-users, not make a new flavor, and I would
					enthusiastically use an existing library if it had the desired features and runtime
					characteristics.
				</p>
				<aside>
					This is a rough sketch from end-user and developer perspectives, not a well-constructed
					spec! See <a href="https://github.com/ryanatkn/end-user-markdown-sketch"
						>the source code</a
					>
					for the implementation and credits. The
					<a href="https://github.com/ryanatkn/end-user-markdown-sketch/discussions"
						>GitHub discussions</a
					>
					are enabled if you're interested, and you can
					<a href="mailto:mail@ryanatkn.com">email me</a> if you would like to keep the discussion private.
				</aside>
			</div>
		</section>
		<section class="panel padded_md section_xl">
			<div class="panel_inner">
				<div class="prose">
					<h2 id="playground">Playground</h2>
					<p>
						These examples are specific to this context's configuration. Each feature is optional
						and configurable, and the patterns are extensible. See <a href="#extensibility"
							>the extensibility section</a
						> for more.
					</p>
					<br />
				</div>
				<Markdown_Playground />
				<div class="prose">
					<aside>
						tip: try opening the contextmenu on <Markdown content="@fox" /> and <Markdown
							content="@dog"
						/> and the other <Markdown content="@mentions and #hashtags" />
					</aside>
					<aside>
						⚠️ this is a proof-of-concept implementation - one obvious bug is that multiple words
						are not supported in bold/italics/code
					</aside>
				</div>
			</div>
		</section>

		<section class="panel padded_md section_xl">
			<section class="panel_inner">
				<h2 id="extensibility">Extensibility</h2>
				<p>
					Almost everything is optional, configurable, or extensible. The goal is to support
					open-ended usecase-specific features, not make a universal markdown.
				</p>
				<p>
					For example, the asterisks for <code>*bold text*</code> are an optional extension
					behavior, so bold could be characters other than <code>*</code>, and its
					<code>&lt;strong&gt;</code> wrapper is configurable. It could be different HTML or a Svelte
					component.
				</p>
				<p>
					This trades away portability for power and flexibility. It's a huge tradeoff and makes
					this flavor unsuitable for many usecases - it doesn't substitute for existing
					platform-independent markdowns.
				</p>
				<p>Some planned extensibility:</p>
				<ul>
					<li>
						text wrapped in control characters, like <code>*bold text*</code> and
						<code>_italics_</code> (probably double character variants too)
					</li>
					<li>
						blocks wrapped in triple control characters, like <code>```code blocks```</code>
					</li>
					<li>
						single words starting with a control character, like <code>@mentions</code> and
						<code>#hashtags</code>
					</li>
				</ul>
				<p>
					<a href="#examples">The examples</a> demonstrate extensions with commonly-used control
					characters. Some example control characters include <code>*</code>, <code>_</code>,
					<code>`</code>, <code>:</code>, <code>~</code>, <code>%</code>, <code>#</code>,
					<code>|</code> - any could be supported, including emoji if you want to get 😈weird😈.
				</p>
			</section>
		</section>

		<section class="panel padded_md section_xl">
			<section class="panel_inner">
				<h2 id="examples">Examples</h2>
				<aside>
					⚠️ the current implementation has many bugs, limitations, and hacks (not the cool kind)
				</aside>
				<details>
					<summary>technical details about how these examples work</summary>
					<p>
						Each of the following examples mounts a Svelte component named <a
							href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/lib/Markdown.svelte"
							><code>Markdown</code></a
						>
						with a
						<code>content</code> prop:
					</p>
					<blockquote>
						<Code content={`<Markdown content="hey @you" />`} />
						<div><Markdown content="hey @you" /></div>
					</blockquote>
					<p>
						The <code>Markdown</code> component internally calls
						<a
							href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/lib/parse_markdown.ts"
							><code>parse_markdown</code></a
						>
						to transform
						<code>content</code> to its JSON representation, an
						<a href="https://github.com/estree/estree">ESTree</a>-compliant AST. (and then
						<a
							href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/lib/todo_hacky_parse.ts"
							>some hacky post-processing</a
						> to demo more features)
					</p>
					<p>
						The @ symbol in <code>hey @you</code> is configured to be interpreted as a shorthand for
						a
						<a
							href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/routes/Mention.svelte"
							><code>Mention</code></a
						>
						component. The text
						<code>@you</code> is equivalent to <Code
							content={`<Mention name="you" />`}
							pre_attrs={{style: 'display: inline'}}
						/>. The component is provided by the app and can be anything.
					</p>
					<p>
						The control characters like @ are customizable to enable app-specific features, and they
						could potentially be defined or customized by end-users. (like the people using a chat
						app) <a href="#extensibility">The extensibility section</a> elaborates.
					</p>
				</details>
			</section>
			<section class="section_lg">
				<h3 id="html-tags">HTML tags</h3>
				<Markdown_Example content={`<aside>example HTML tag</aside>`} />
				<Markdown_Example
					content={`<aside>\n\t<blockquote>\n\t\t<aside>example nesting</aside>\n\t\t<details><summary>example summary</summary>hidden details</details>\n\t</blockquote>\n</aside>`}
				/>
			</section>
			<section class="section_lg">
				<h3 id="html_attributes">HTML attributes</h3>
				<p>
					A safe subset of HTML attributes is supported. Some attributes are sensitive for security
					or privacy, and some contexts need to disallow styles that break the UX.
				</p>
				<Code
					lang="ts"
					content={`export const ALLOWED_HTML_ATTRS = new Set([\n\t${Array.from(ALLOWED_HTML_ATTRS)
						.map((a) => `'${a}'`)
						.join(', ')}\n]);`}
				/>
				<p>
					The <code>src</code> and <code>href</code> attributes are enabled here despite having
					security and privacy issues in some contexts. (not here though!) Granular runtime
					configuration including allowlisted hosts is probably desired. Some issues can be handled
					orthogonally with a
					<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">Content Security Policy</a
					>.
				</p>
				<Markdown_Example content={`with class:\n<span class="chip">.chip</span>`}>
					<p>
						Element classes are a powerful and safe way for end-users to access the app's styles:
					</p>
				</Markdown_Example>
				<Markdown_Example
					content={`safe attributes work:\n<img\n\tsrc="${base}/favicon.png"\n\talt="a little yellow spider"\n\ttitle="this site's favicon"\n\twidth="128"\n\theight="128"\n\tclass="pixelated"\n/>`}
				/>
			</section>
			<section class="section_lg">
				<h3 id="syntax-sugar">Syntax sugar</h3>
				<Markdown_Example content={`*asterisks* are replaced with a <code>strong</code> tag`} />
				<Markdown_Example content={`_underscores_ are replaced with an <code>em</code> tag`} />
				<Markdown_Example content={`\`backticks\` are replaced with a <code>code</code> tag`} />
				<details>
					<summary>TODO</summary>
					<ul>
						<li>correctly support these across multiple words</li>
						<li>headers</li>
						<li>lists, using <code>- this</code> not also <code>* that</code></li>
						<li><code>```code blocks```</code> with syntax highlighting</li>
						<li>
							resolve backtick-wrapped <Markdown content="`known_identifiers`" /> to a system-defined
							namespace, like an app's vocabulary for contextmenu and other widgety behaviors
						</li>
						<li>extensibility</li>
					</ul>
				</details>
			</section>
			<section class="section_lg">
				<h3 id="links">Links</h3>
				<Markdown_Example
					content={`/root link to the current base (like GitHub's flavor, not necessarily absolute to the host!)`}
				/>
				<p>
					<code>/path</code> is a shorthand for <Code
						inline
						content={'<Link href="{base}/path" />'}
					/>
				</p>
				<Markdown_Example
					content={`network link to <code>https:</code> - //github.com/ryanatkn/end-user-markdown-sketch`}
				/>
				<p>
					<code>//path</code> is a shorthand for <Code
						inline
						content={'<Link href="https://path" />'}
					/>
				</p>
				<p>
					The <code>Link</code> component is configurable, and the <code>/</code> and
					<code>//</code> behaviors are a usecase-specific extension.
				</p>
			</section>
			<section class="section_lg">
				<h3 id="mentions">Mentions</h3>
				<Markdown_Example content={`@username mentions have contextmenus`} />
				<p>
					The <code>@</code> is a shorthand for <Code
						inline
						content={'<Mention name="username" />'}
					/>.
				</p>
				<p>
					The <code>Mention</code> component is configurable, and the <code>@</code> behavior is a usecase-specific
					extension.
				</p>
			</section>
			<section class="section_lg">
				<h3 id="hashtag">Hashtags</h3>
				<Markdown_Example content={`#hashtags have contextmenus`} />
				<p>
					The <code>#</code> is a shorthand for <Code
						inline
						content={'<Hashtag name="hashtags" />'}
					/>.
				</p>
				<p>
					The <code>Hashtag</code> component is configurable, and the <code>#</code> behavior is a usecase-specific
					extension.
				</p>
			</section>
			<section>
				<h3 id="svelte-components">Svelte components</h3>
				<aside>
					⚠️ Svelte component support is specific to my usecases. Maybe the implementation should be
					framework-agnostic, but I'm less interested in that because I'm focused on my end-users.
				</aside>
				<p>
					Tags with capital letters like <code>{'<'}This /></code> are interpreted as Svelte components.
					Each app chooses which components to provide, and the feature can be disabled by providing
					no components. This example app provides the following components:
				</p>
				<ul>
					{#each Object.keys(components) as component}
						<li>
							<a
								href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/routes/{component}.svelte"
								>{component}</a
							>
						</li>
					{/each}
				</ul>
				<Markdown_Example
					content={`<Link href="/route">this Link</Link> does the same as /route`}
				/>
				<Markdown_Example content={`mentioning <Mention name="username" /> the long way`} />
				<Markdown_Example content={`<Hashtag name="this" /> is equivalent to #this`} />
				<Markdown_Example content={`<Missing /> components are called out`}>
					<p>If a component isn't found, it renders a fallback that preserves the source text:</p>
					<p slot="after">
						Perhaps an optional Svelte component can be provided for missing components, and
						plaintext is rendered if none is provided.
					</p>
				</Markdown_Example>
			</section>
		</section>

		<section class="panel padded_md section_xl">
			<section class="panel_inner">
				<h2 id="discussions">Discussions</h2>
				<ul>
					<li>
						<a href="https://github.com/ryanatkn/end-user-markdown-sketch/discussions/2"
							>Questions or comments?</a
						>
					</li>
					<li>
						<a href="https://github.com/ryanatkn/end-user-markdown-sketch/discussions/1"
							>Newline behavior</a
						>
					</li>
				</ul>
			</section>
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
		padding: var(--spacing_md);
		background-color: var(--bg);
		border-radius: var(--border_radius_xs);
	}

	/* TODO these are all hacky, is a recurring issue */
	h2 {
		margin-top: 0 !important;
	}
	section:last-child {
		margin-bottom: 0 !important;
	}
	.section_lg.section_lg {
		margin-bottom: var(--spacing_6);
	}
	.section_xl.section_xl {
		margin-bottom: var(--spacing_8);
	}
</style>
