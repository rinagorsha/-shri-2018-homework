import { Registry, withRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';
import AppCommon from './App';
import Camera from '../components/Camera/Camera@desktop';
import Panel from '../components/Panel/Panel@desktop';

const cnApp = cn('App');
const cnCamera = cn('Camera');
const cnPanel = cn('Panel');

const registry = new Registry({ id: cnApp() });
registry.set(cnCamera(), Camera);
registry.set(cnPanel(), Panel);

export default withRegistry(registry)(AppCommon);
