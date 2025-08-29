import {Suspense} from 'react';
import {useParams} from '@remix-run/react';
import {AccountPasswordResetForm} from '~/components';
import {Layout} from '~/components/index.server';

export default function ResetPassword() {
  const {id, resetToken} = useParams();
  return (
    <Layout>
      <Suspense>
        <AccountPasswordResetForm id={id} resetToken={resetToken} />
      </Suspense>
    </Layout>
  );
}

