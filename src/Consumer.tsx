import * as React from 'react';

import { IProvider } from './Host';

interface IConsumerProps {
  children: React.ReactNode;
  manager: IProvider | null;
}

export const Consumer = ({ children, manager }: IConsumerProps): null => {
  const key = React.useRef<string | undefined>(undefined);

  const checkManager = React.useCallback((): void => {
    if (!manager) {
      throw new Error('No portal manager defined');
    }
  }, [manager]);

  React.useEffect(() => {
    checkManager();
    manager?.update(key.current, children);
  }, [children, manager]);

  React.useEffect(() => {
    const handleInit = (): void => {
      checkManager();
      key.current = manager?.mount(children);
    };
    handleInit();

    return (): void => {
      checkManager();
      manager?.unmount(key.current);
    };
  }, []);

  return null;
};
