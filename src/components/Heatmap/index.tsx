import config, { IHeatmapProps } from './Heatmap.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Heatmap.build';
import Render from './Heatmap.render';

const Heatmap: T4DComponent<IHeatmapProps> = (props) => {
	const { enabled } = useEnhancedEditor((state) => ({
		enabled: state.options.enabled,
	}));

	return enabled ? <Build {...props} /> : <Render {...props} />;
};

Heatmap.craft = config.craft;
Heatmap.info = config.info;
Heatmap.defaultProps = config.defaultProps;

export default Heatmap;
