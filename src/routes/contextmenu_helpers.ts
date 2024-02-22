// TODO this is just a hacky proof of concept

import type {Contextmenu_Action_Params} from '@ryanatkn/fuz/contextmenu.js';

// TODO hacky, refactor
const icons = {fox: '🦊', dog: '🐶'};
const greetings = {fox: 'hail', dog: 'hello'};

export const greet_actor = (name: string): Contextmenu_Action_Params => {
	const greeting = name in greetings ? greetings[name as keyof typeof greetings] : 'hi';
	const icon = name in icons ? icons[name as keyof typeof icons] : '@';
	return {
		content: 'Greet @' + name,
		icon,
		run: () => {
			// TODO hacky
			// eslint-disable-next-line no-alert
			alert(`${icon}${name} says ${greeting} back to you!`);
		},
	};
};

// TODO hacky
export const do_something_with_hashtag = (name: string): void => {
	// eslint-disable-next-line no-alert
	alert('you selected the hashtag "' + name + '", I wonder what that could do');
};
