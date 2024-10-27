import {create_context} from '@ryanatkn/fuz/context_helpers.js';

import Link from '$routes/Link.svelte';
import Mention from '$routes/Mention.svelte';
import Hashtag from '$routes/Hashtag.svelte';
import type {Markdown_Components} from '$lib/view.js';

// TODO this is just a hacky proof of concept

// These are app-specific. Users generally call `set_components` at the top-level with this value.
export const components: Markdown_Components = {
	Link,
	Mention,
	Hashtag,
};

export const components_context = create_context<Markdown_Components>();
