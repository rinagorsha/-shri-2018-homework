import { Registry, withRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';
import AppCommon from './App';
import Camera from '../components/Camera/Camera@desktop';

const cnApp = cn('App');
const cnCamera = cn('Camera');

const registry = new Registry({ id: cnApp() });
registry.set(cnCamera(), Camera);

export default withRegistry(registry)(AppCommon);
