import config, { IRangeBarProps } from './RangeBar.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './RangeBar.build';
import Render from './RangeBar.render';

const RangeBar: T4DComponent<IRangeBarProps> = (props) => {
	const { enabled } = useEnhancedEditor((state) => ({
		enabled: state.options.enabled,
	}));

	return enabled ? <Build {...props} /> : <Render {...props} />;
};

RangeBar.craft = config.craft;
RangeBar.info = config.info;
RangeBar.defaultProps = config.defaultProps;

export default RangeBar;
