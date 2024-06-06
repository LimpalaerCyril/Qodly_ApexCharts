import config, { IAreaProps } from './Area.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Area.build';
import Render from './Area.render';

const Area: T4DComponent<IAreaProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Area.craft = config.craft;
Area.info = config.info;
Area.defaultProps = config.defaultProps;

export default Area;
