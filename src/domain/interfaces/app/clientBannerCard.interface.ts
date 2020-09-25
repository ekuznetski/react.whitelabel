export interface IClientBannerCard {
	type: 'red' | 'blue';
	bg_img?: string;
	bg_color?: string;
	title?: string;
	text: string;
	link: {
		path?: string;
		text: string;
	};
	disabled?: boolean;
}
