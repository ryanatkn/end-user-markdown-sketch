// TODO this is just a hacky proof of concept

import Link from '$routes/Link.svelte';
import Mention from '$routes/Mention.svelte';
import Hashtag from '$routes/Hashtag.svelte';
import type {MarkdownComponents} from '$lib/view.js';

// These are app-specific. Users generally call `set_components` at the top-level with this value.
export const components: MarkdownComponents = {
	Link,
	Mention,
	Hashtag,
};
