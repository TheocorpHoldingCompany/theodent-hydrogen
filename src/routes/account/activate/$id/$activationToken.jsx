import {Suspense} from 'react';
import {useParams} from '@remix-run/react';
import {AccountActivateForm} from '~/components';
import {Layout} from '~/components/index.server';

export default function ActivateAccount() {
  const {id, activationToken} = useParams();
  return (
    <Layout>
      <Suspense>
        <AccountActivateForm id={id} activationToken={activationToken} />
      </Suspense>
    </Layout>
  );
}

