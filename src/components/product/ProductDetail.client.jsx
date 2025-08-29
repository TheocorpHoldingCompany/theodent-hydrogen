// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Disclosure} from '@headlessui/react';
import {Link} from '@remix-run/react';
import {BsX} from 'react-icons/bs';
import {Text} from '~/components';
import React, {useState} from 'react';

export function ProductDetail({title, content, learnMore}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2" style={{}}>
      {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
      {({open}) => (
        <>
          <Disclosure.Button className="text-left">
            <div
              className="flex justify-between"
              style={{
                borderTop: '2px solid #CC8A51',
                paddingTop: 20,
                paddingBottom: 18,
              }}
            >
              <Text size="lead" as="h4" style={{color: '#2A1B16'}}>
                {title}
              </Text>
              <BsX
                style={{fontSize: 24, color: '#2A1B16'}}
                className={`${
                  open ? '' : 'rotate-[45deg]'
                } transition-transform transform-gpu duration-200`}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-4'}>
            <div style={{color: '#2A1B16'}}>{content}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export function ProductDetail2({title, content, learnMore}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2" style={{}}>
      {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
      {({open}) => (
        <>
          <Disclosure.Button className="text-left">
            <div
              className="flex justify-between"
              style={{
                borderTop: '2px solid #CC8A51',
                paddingTop: 20,
                paddingBottom: 18,
              }}
            >
              <Text size="lead" as="h4" style={{color: '#2A1B16'}}>
                {title}
              </Text>
              <BsX
                style={{fontSize: 24, color: '#2A1B16'}}
                className={`${
                  open ? '' : 'rotate-[45deg]'
                } transition-transform transform-gpu duration-200`}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-3'}>
            <div
              style={{color: '#2A1B16', width: '100%', flexDirection: 'column'}}
              className="d-flex"
            >
              {content[0]?.map((c, key) => (
                <div key={key} style={{width: '100%'}}>
                  {c}
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export function ProductDetail3({title, content, learnMore}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2" style={{}}>
      {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
      {({open}) => (
        <>
          <Disclosure.Button className="text-left">
            <div
              className="flex justify-between"
              style={{paddingTop: 20, paddingBottom: 18}}
            >
              <Text size="lead" as="h4" style={{color: '#2A1B16'}}>
                {title}
              </Text>
              <BsX
                style={{fontSize: 24, color: '#2A1B16'}}
                className={`${
                  open ? '' : 'rotate-[45deg]'
                } transition-transform transform-gpu duration-200`}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-4'}>
            <div style={{color: '#2A1B16'}}>{content}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export const ExampleDrop = ({btns}) => {
  const [disclosures, setDisclosures] = useState(btns);

  const handleClick = (id) => {
    setDisclosures(
      disclosures.map((d) =>
        d.id === id ? {...d, isOpen: !d.isOpen} : {...d, isOpen: false},
      ),
    );
  };

  return (
    <div className="mt-4">
      {disclosures.map(({id, isOpen, buttonText, panelText}) => (
        <div key={id}>
          <div style={{width: '100%', height: 2, background: '#CC8A51'}} />
          <React.Fragment>
            <button
              style={{height: 64}}
              className="flex w-full justify-between align-items-center"
              onClick={() => handleClick(id)}
              aria-expanded={isOpen}
              {...(isOpen && {'aria-controls': id})}
            >
              <Text size="lead" as="h4" style={{color: '#2A1B16'}}>
                {buttonText}
              </Text>
              <BsX
                style={{fontSize: 24, color: '#2A1B16'}}
                className={`${
                  isOpen ? '' : 'rotate-[45deg]'
                } transition-transform transform-gpu duration-200`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {panelText}
              </div>
            )}
          </React.Fragment>
        </div>
      ))}
    </div>
  );
};
