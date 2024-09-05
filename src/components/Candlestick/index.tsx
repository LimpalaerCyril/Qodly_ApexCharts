import config, { IBubbleProps } from './Candlestick.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Candlestick.build';
import Render from './Candlestick.render';

const Candlestick: T4DComponent<IBubbleProps> = (props) => {
	const { enabled } = useEnhancedEditor((state) => ({
		enabled: state.options.enabled,
	}));

	return enabled ? <Build {...props} /> : <Render {...props} />;
};

Candlestick.craft = config.craft;
Candlestick.info = config.info;
Candlestick.defaultProps = config.defaultProps;

export default Candlestick;
