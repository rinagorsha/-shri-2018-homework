import { Registry, withRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';
import AppCommon from './App';
import Camera from '../components/Camera/Camera@touch';
import Panel from '../components/Panel/Panel@touch';

const cnApp = cn('App');
const cnCamera = cn('Camera');
const cnPanel = cn('Panel');

const registry = new Registry({ id: cnApp() });
registry.set(cnCamera(), Camera);
registry.set(cnPanel(), Panel);

export default withRegistry(registry)(AppCommon);
