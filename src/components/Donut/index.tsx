import config, { IDonutProps } from './Donut.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Donut.build';
import Render from './Donut.render';

const Donut: T4DComponent<IDonutProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Donut.craft = config.craft;
Donut.info = config.info;
Donut.defaultProps = config.defaultProps;

export default Donut;
