import {CartDetails} from '~/components/cart';
import {Drawer} from './Drawer.client';

export function CartDrawer({isOpen, onClose, alert}) {
  return (
    <Drawer open={isOpen} onClose={onClose} alert={alert} heading="Cart" openFrom="right">
      <img alt='' src='/imgs/cart1.png' style={{ position: 'absolute', left: 0, top: 0, width: '100%', objectFit: 'cover' }} />
      <img alt='' src='/imgs/cart2.png' style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', objectFit: 'cover' }} />
      <CartDetails layout="drawer" onClose={onClose} />
    </Drawer>
  );
}
